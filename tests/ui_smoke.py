"""
Browser smoke test for the interface (Playwright + Chromium).

    pip install playwright && python -m playwright install chromium
    python tests/ui_smoke.py            # tests index.html
    python tests/ui_smoke.py --dist     # tests the built single file

Exits with code 1 on failure. Screenshots go to tests/screenshots/.
"""
import os
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
TARGET = ROOT / ("dist/cancer-support-chatbot.html" if "--dist" in sys.argv else "index.html")
SHOTS = ROOT / "tests" / "screenshots"
SHOTS.mkdir(parents=True, exist_ok=True)
URL = TARGET.as_uri()

results = []


def check(name, cond, detail=""):
    results.append((name, bool(cond), detail))


def last_card(page):
    return page.locator("#logInner .msg.bot article.card").last


def ask(page, text):
    page.fill("#input", text)
    page.keyboard.press("Enter")
    page.wait_for_function("() => !document.getElementById('thinking')", timeout=5000)


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(viewport={"width": 1280, "height": 860})
        ctx.grant_permissions(["clipboard-read", "clipboard-write"])
        # Block remote fonts so the test is deterministic and offline-safe.
        ctx.route("**/*", lambda route: route.abort() if route.request.url.startswith("http") else route.continue_())
        page = ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" and "net::" not in m.text and "Failed to load resource" not in m.text else None)

        page.goto(URL)
        page.wait_for_selector(".card.welcome")
        check("1. app launches without script errors", not errors, "; ".join(errors))
        check("2. opening screen shows welcome and suggestions", page.locator(".welcome .chip.suggest").count() == 6)
        page.screenshot(path=str(SHOTS / "desktop-welcome.png"))

        # 9. Suggested question
        page.locator(".welcome .chip.suggest", has_text="What does biopsy mean?").click()
        page.wait_for_function("() => !document.getElementById('thinking') && document.querySelectorAll('#logInner .msg.bot').length >= 2")
        check("9. suggested question gives the biopsy answer", "Biopsy" in last_card(page).locator("h3").inner_text())
        check("   answer shows an 'In short' definition", last_card(page).locator(".lead").count() == 1)

        # 3/4. Typed question, Enter to send
        ask(page, "Will my child lose their hair?")
        t1 = last_card(page).locator("h3").inner_text()
        check("3. typed question with Enter gives a relevant answer", t1 == "Hair loss", t1)
        ask(page, "what happens during chemotherapy")
        t2 = last_card(page).locator("h3").inner_text()
        check("4. different questions give different answers", t2 == "Chemotherapy" and t2 != t1, t2)

        # follow-up chip + context
        ask(page, "does it hurt?")
        check("   follow-up keeps context (chemo FAQ)", "chemotherapy hurt" in last_card(page).locator("h3").inner_text().lower())

        # details expand, term chip
        ask(page, "what is a lumbar puncture")
        card = last_card(page)
        card.locator("details.more > summary").click()
        check("   'Read more' expands details", card.locator("details.more").get_attribute("open") is not None)
        if card.locator(".chip.term").count():
            card.locator(".chip.term").first.click()
            check("   glossary chip shows a definition", card.locator(".term-def").count() == 1)

        # 5. synonyms
        ask(page, "hair fall after chemo")
        check("5. everyday synonym 'hair fall' handled", last_card(page).locator("h3").inner_text() == "Hair loss")

        # 6. unknown
        ask(page, "what is the weather today")
        check("6. unknown question gives honest fallback", "not sure" in last_card(page).locator("h3").inner_text().lower())

        # 7. urgent
        ask(page, "my son has a fever")
        c = last_card(page)
        check("7. urgent symptom gives safety card", "urgent" in (c.get_attribute("class") or ""))
        check("   warning is first and mentions the team", "treating team" in c.locator(".prose p").first.inner_text())
        page.screenshot(path=str(SHOTS / "desktop-urgent.png"))

        # 8. boundary
        ask(page, "will my child survive")
        check("8. prognosis request handled safely", "boundary" in (last_card(page).get_attribute("class") or ""))
        ask(page, "should we stop chemo and try ayurveda")
        check("   treatment decision handled safely", "Decisions about treatment" in last_card(page).locator("h3").inner_text())

        # 11. copy
        ask(page, "Will my child lose their hair?")
        last_card(page).locator(".card-foot button", has_text="Copy").click()
        page.wait_for_timeout(300)
        clip = page.evaluate("navigator.clipboard.readText()")
        check("11. copy puts the answer on the clipboard", "HAIR LOSS" in clip and "not medical advice" in clip, clip[:60])

        # add questions to checklist
        last_card(page).locator(".ask-team button", has_text="Add these").click()
        check("   'Add to checklist' updates the badge", page.locator("#checkCount").is_visible())

        # 12. topic navigation
        page.click(".nav-item[data-view=library]")
        check("12. library view opens", page.locator("#view-library").is_visible())
        page.fill("#libSearch", "port")
        page.locator(".topic-btn", has_text="Ports and central lines").click()
        page.wait_for_function("() => !document.getElementById('thinking')")
        check("   choosing a topic shows it in the conversation", last_card(page).locator("h3").inner_text() == "Ports and central lines")
        page.locator("#logInner .card-foot button", has_text="More in this category").last.click()
        check("   'More in this category' returns to the library", page.locator("#view-library").is_visible())
        page.fill("#libSearch", "zzqx")
        check("   library empty state", page.locator("#libList .empty").count() == 1)

        # glossary
        page.click(".nav-item[data-view=glossary]")
        page.fill("#glossSearch", "platelet")
        check("   glossary search finds platelets", page.locator(".gloss-item dt", has_text="Platelets").count() >= 1)
        page.fill("#glossSearch", "zzqx")
        check("   glossary empty state", page.locator("#glossList .empty").count() == 1)

        # checklist
        page.click(".nav-item[data-view=checklist]")
        page.locator(".check-item label", has_text="What is the treatment plan, and how long will it last?").click()
        page.fill("#ownQuestion", "Can she attend her cousin's wedding?")
        page.click("#addQuestionForm button")
        check("   custom question added", page.locator(".check-item label", has_text="cousin's wedding").count() == 1)
        page.click("#copyChecklist")
        page.wait_for_timeout(300)
        clip = page.evaluate("navigator.clipboard.readText()")
        check("   checklist copies as a numbered list", "1. " in clip and "wedding" in clip, clip[:80])
        page.screenshot(path=str(SHOTS / "desktop-checklist.png"), full_page=True)

        # persistence opt-in
        page.check("#persistToggle")
        stored = page.evaluate("localStorage.getItem('csc-checklist-v1')")
        check("   checklist saved only after opt-in", stored is not None and "wedding" in stored)
        page.uncheck("#persistToggle")
        check("   turning off deletes the saved copy", page.evaluate("localStorage.getItem('csc-checklist-v1')") is None)
        convo_saved = page.evaluate("Object.keys(localStorage).length")
        check("   conversation is never written to storage", convo_saved == 0)

        # debug toggle
        page.click(".nav-item[data-view=how]")
        page.check("#debugToggle")
        page.click(".nav-item[data-view=chat]")
        ask(page, "what is a biospy")
        check("   match inspector shows details", "fuzzy" in last_card(page).locator("pre.debug").inner_text() or "biopsy" in last_card(page).locator("pre.debug").inner_text())
        page.click(".nav-item[data-view=how]")
        page.uncheck("#debugToggle")
        page.click(".nav-item[data-view=about]")
        page.screenshot(path=str(SHOTS / "desktop-about.png"))
        page.click(".nav-item[data-view=chat]")

        # 10/17. new conversation clears
        before = page.locator("#logInner .msg").count()
        page.click("#newChatBtn")
        after = page.locator("#logInner .msg").count()
        check("10/17. new conversation clears the transcript", before > 3 and after == 1, f"{before} -> {after}")
        ask(page, "does it hurt?")
        check("   context is reset after clearing", "chemotherapy" not in last_card(page).locator("h3").inner_text().lower())

        # empty message
        page.fill("#input", "   ")
        page.keyboard.press("Enter")
        page.wait_for_timeout(200)
        check("   empty message is not sent", page.locator("#logInner .msg.user").count() == 1)

        # 14. accessible names on every button
        unnamed = page.evaluate("""() => [...document.querySelectorAll('button')].filter(b => !(b.innerText.trim() || b.getAttribute('aria-label') || b.querySelector('.sr-only'))).length""")
        check("14. every button has an accessible name", unnamed == 0, str(unnamed))

        # 13. dark theme desktop
        page.evaluate("document.documentElement.setAttribute('data-theme','dark')")
        ask(page, "What should I ask the doctor tomorrow?")
        page.screenshot(path=str(SHOTS / "desktop-dark.png"))
        page.evaluate("document.documentElement.removeAttribute('data-theme')")
        check("   no script errors during the whole session", not errors, "; ".join(errors))

        # 13. mobile
        m = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        m.route("**/*", lambda route: route.abort() if route.request.url.startswith("http") else route.continue_())
        mp = m.new_page()
        mp.goto(URL)
        mp.wait_for_selector(".card.welcome")
        overflow = mp.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        check("13. mobile: no horizontal scroll", overflow <= 0, str(overflow))
        check("   mobile: sidebar hidden, menu button shown", mp.locator("#menuBtn").is_visible())
        mp.screenshot(path=str(SHOTS / "mobile-welcome.png"))
        mp.fill("#input", "What does remission mean?")
        mp.click("#sendBtn")
        mp.wait_for_function("() => !document.getElementById('thinking') && document.querySelectorAll('#logInner .msg.bot').length >= 2")
        check("   mobile: send button works", "Remission" in last_card(mp).locator("h3").inner_text())
        mp.screenshot(path=str(SHOTS / "mobile-answer.png"))
        mp.click("#menuBtn")
        mp.wait_for_timeout(300)
        check("   mobile: drawer opens", mp.evaluate("document.getElementById('app').classList.contains('drawer-open')"))
        mp.screenshot(path=str(SHOTS / "mobile-drawer.png"))
        mp.click(".nav-item[data-view=glossary]")
        check("   mobile: drawer navigation works and closes", mp.locator("#view-glossary").is_visible() and not mp.evaluate("document.getElementById('app').classList.contains('drawer-open')"))
        overflow2 = mp.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        check("   mobile: glossary has no horizontal scroll", overflow2 <= 0, str(overflow2))
        mp.evaluate("document.documentElement.setAttribute('data-theme','dark')")
        mp.click("#menuBtn"); mp.click(".nav-item[data-view=chat]")
        mp.fill("#input", "my daughter has a fever"); mp.click("#sendBtn")
        mp.wait_for_function("() => !document.getElementById('thinking')")
        mp.screenshot(path=str(SHOTS / "mobile-dark-urgent.png"))

        browser.close()

    width = max(len(n) for n, _, _ in results)
    fails = 0
    for name, ok, detail in results:
        print(("PASS " if ok else "FAIL ") + name.ljust(width) + ("" if ok or not detail else "   [" + detail + "]"))
        fails += 0 if ok else 1
    print(f"\n{len(results) - fails} passed, {fails} failed  ({TARGET.name})")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    run()
