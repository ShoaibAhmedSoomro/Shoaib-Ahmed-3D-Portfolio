"""Builds public/resume/Shoaib_Ahmed.pdf from src/data/career.json.

Run from the repo root:  python scripts/build-resume.py
Needs PyMuPDF:           pip install pymupdf
Experience comes from the same JSON the website uses, so the two never drift apart.
"""
import json
import shutil
import tempfile
from datetime import date
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "resume" / "Shoaib_Ahmed.pdf"
entries = json.loads((ROOT / "src/data/career.json").read_text(encoding="utf8"))["entries"]

# Same rule as src/data/profile.ts: first role started in September 2019.
START = date(2019, 9, 1)
years = int((date.today() - START).days // 365.25)

CSS = """
body { font-family: sans-serif; font-size: 9.6pt; line-height: 1.38; color: #1a1a1a; }
h1 { font-size: 23pt; margin: 0 0 1pt 0; color: #0b080c; }
.role { font-size: 11.5pt; color: #444444; margin: 0 0 5pt 0; }
.contact { font-size: 9pt; color: #333333; margin: 0 0 6pt 0; }
h2 { font-size: 10.5pt; color: #0b080c; border-bottom: 1px solid #999999; padding-bottom: 1pt; margin: 11pt 0 4pt 0; }
p { margin: 0 0 3pt 0; }
ul { margin: 2pt 0 4pt 0; padding-left: 13pt; }
li { margin: 0 0 1.5pt 0; }
table { width: 100%; border-collapse: collapse; margin: 5pt 0 0 0; }
td { padding: 0; vertical-align: top; }
td.r { text-align: right; color: #444444; }
.org { font-weight: bold; }
.title { font-style: italic; color: #333333; }
.k { font-weight: bold; }
"""


def li(items):
    return "<ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>"


def job(e):
    return (f"<table><tr><td class='org'>{e['company']}</td><td class='r'>{e['place']}</td></tr>"
            f"<tr><td class='title'>{e['role']}</td><td class='r'>{e['dates']}</td></tr></table>"
            + li(e["points"]))


def proj(name, stack, points):
    return f"<p><span class='k'>{name}</span> ({stack})</p>" + li(points)


HTML = f"""
<h1>Shoaib Ahmed</h1>
<p class='role'>IT Infrastructure Engineer and Full-Stack Developer</p>
<p class='contact'>soomro.shoaibahmed@gmail.com | linkedin.com/in/shoaibaofficial | github.com/ShoaibAhmedSoomro | shoaibahmedsoomro.eu.cc<br/>Sindh, Pakistan. Open to remote work and relocation.</p>

<h2>Summary</h2>
<p>IT infrastructure engineer with {years} years in IT. I keep servers and cloud systems running on Google Cloud and Linux, manage Microsoft 365 security settings, and build the Node.js, React and Python web apps that run on them. Based in Pakistan, working remotely for a real estate company in Dubai.</p>

<h2>Skills</h2>
<p><span class='k'>Infrastructure:</span> Linux, Google Cloud (Compute Engine, Load Balancing), Microsoft 365, server monitoring, CI/CD, PM2</p>
<p><span class='k'>Languages:</span> JavaScript, TypeScript, Python</p>
<p><span class='k'>Frontend:</span> React, Next.js, responsive design, accessibility basics</p>
<p><span class='k'>Backend:</span> Node.js, Express.js, REST APIs, JWT login, webhooks, Socket.IO</p>
<p><span class='k'>Data and services:</span> MySQL / MariaDB, Stripe, PayPal, WhatsApp APIs, OpenAI and Gemini APIs</p>

<h2>Experience</h2>
{"".join(job(e) for e in entries)}

<h2>Selected Projects</h2>
{proj("ASICO WhatsApp Bot", "Node.js, Express, MySQL, Socket.IO", [
    "A WhatsApp Business CRM that automates customer support, with a live inbox, workflows and AI-assisted replies.",
    "Connects to the WhatsApp Cloud API (webhooks) and WhatsApp Web sessions, with token-secured REST endpoints."])}
{proj("RealEstateApp AE", "Angular 17, TypeScript", [
    "A property management platform with an AI agent, WhatsApp automation, CRM and leasing."])}
{proj("PropertyApp Lite", "JavaScript", [
    "Property management that covers the full leasing process for UAE real estate."])}
{proj("ASICO Signature Generator", "HTML, CSS, JavaScript", [
    "An internal tool that creates branded email signatures in English and Arabic."])}
{proj("Interactive Resume (this portfolio)", "React, Three.js, GSAP", [
    "A 3D portfolio with scroll animations, light and dark themes and a one-click resume download."])}

<h2>Education</h2>
<table><tr><td class='org'>University of Sindh</td><td class='r'>Jan 2020 to Dec 2023</td></tr>
<tr><td class='title'>BS, Computer Science</td><td class='r'></td></tr></table>

<h2>Certifications</h2>
<ul>
<li>Google Cloud Skill Badge: Implement Load Balancing on Compute Engine</li>
<li>ISO/IEC 27001 Information Security Associate</li>
<li>Microsoft 365 compliance training (MS-102 learning path)</li>
<li>Microsoft training: Defend Against Threats with Microsoft 365</li>
<li>Python Essentials 1</li>
</ul>
"""

A4 = pymupdf.paper_rect("a4")
WHERE = A4 + (42, 36, -42, -36)
story = pymupdf.Story(html=HTML, user_css=CSS)

# Write to a temp file first: OneDrive can lock files inside the repo mid-write.
tmp = Path(tempfile.mkdtemp()) / "resume.pdf"
writer = pymupdf.DocumentWriter(str(tmp))
more = True
while more:
    dev = writer.begin_page(A4)
    more, _ = story.place(WHERE)
    story.draw(dev)
    writer.end_page()
writer.close()
shutil.copyfile(tmp, OUT)

doc = pymupdf.open(OUT)
print(f"wrote {OUT} ({len(doc)} pages, {years} years)")
