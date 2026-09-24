#!/usr/bin/env python3
"""Generate Harsh Tripathi's one-page resume PDF for the portfolio download."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY

VIOLET = HexColor("#7c3aed")
DARK = HexColor("#1e1b2e")
GREY = HexColor("#555555")

styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=22, leading=26, alignment=TA_CENTER, textColor=DARK),
    "sub": ParagraphStyle("sub", fontName="Helvetica", fontSize=10.5, leading=14, alignment=TA_CENTER, textColor=VIOLET),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=8.8, leading=12, alignment=TA_CENTER, textColor=GREY),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=VIOLET, spaceBefore=8, spaceAfter=2),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.2, leading=12.6, alignment=TA_JUSTIFY, textColor=HexColor("#333333")),
    "item": ParagraphStyle("item", fontName="Helvetica", fontSize=9.2, leading=12.6, textColor=HexColor("#333333"), leftIndent=10),
    "jobtitle": ParagraphStyle("jobtitle", fontName="Helvetica-Bold", fontSize=9.8, leading=13, textColor=DARK),
    "jobdate": ParagraphStyle("jobdate", fontName="Helvetica", fontSize=9, leading=13, alignment=2, textColor=GREY),
}

def section(title):
    return [Paragraph(title, styles["section"]), HRFlowable(width="100%", thickness=0.8, color=VIOLET, spaceAfter=4)]

def two_col(left, right):
    t = Table([[left, right]], colWidths=[125*mm, 52*mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
    ]))
    return t

story = []
story.append(Paragraph("HARSH TRIPATHI", styles["name"]))
story.append(Spacer(1, 2))
story.append(Paragraph("Full-Stack Developer · Data Analyst · SEO Specialist", styles["sub"]))
story.append(Spacer(1, 3))
story.append(Paragraph(
    "Noida, Uttar Pradesh, India | +91-6390503738 | k.tripathiharsh2005@gmail.com<br/>"
    '<link href="https://www.linkedin.com/in/harsh-tripathi-2ab741330">LinkedIn</link> | '
    '<link href="https://github.com/harshtriphati6390">GitHub</link>',
    styles["contact"]))
story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=1.2, color=VIOLET))

# Summary
story += section("PROFESSIONAL SUMMARY")
story.append(Paragraph(
    "CS graduate (B.Tech CSE, 2026) who builds across the whole stack, not just one layer. Built a React + Node.js/Express "
    "task manager with JWT auth and MySQL (TaskFlow), and a FastAPI + MongoDB cardiac risk prediction app (HeartIQ). "
    "Experienced in SQL, Python and Power BI/DAX dashboarding. Ran full technical SEO campaigns — keyword research, indexing "
    "fixes, backlink outreach — tracked in Google Search Console and Analytics. Led a team through Flipkart GRiD 5.0. "
    "Seeking Software Developer / Data Analyst / SEO roles.", styles["body"]))

# Skills
story += section("TECHNICAL SKILLS")
skills_rows = [
    ("Frontend:", "HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap, Responsive Web Design"),
    ("Backend:", "Node.js, Express.js, FastAPI, REST API Design, Authentication &amp; Authorization (JWT)"),
    ("Database:", "MySQL, MongoDB, SQL Server / Azure SQL, Joins, CTEs, Window Functions"),
    ("Data &amp; BI:", "Power BI (DAX, Power Query), Python (Pandas, NumPy, Matplotlib, Seaborn), Excel, EDA"),
    ("SEO:", "Technical SEO, Keyword Research, Google Search Console, GA4, SEMrush/Ahrefs, WordPress, Yoast"),
    ("Tools:", "Git &amp; GitHub, Postman, VS Code, Jupyter, Google Colab, npm"),
    ("CS Core:", "OOP, Data Structures &amp; Algorithms, Debugging, Agile/SDLC exposure"),
]
for label, rest in skills_rows:
    story.append(Paragraph(f"<b>{label}</b> {rest}", styles["item"]))

# Projects
story += section("PROJECTS")
story.append(two_col(Paragraph("TaskFlow — Full-Stack Task Manager | React.js, Node.js, Express, MySQL", styles["jobtitle"]), Paragraph("2026", styles["jobdate"])))
for b in [
    "Built a React frontend (Bootstrap) with a Node.js/Express REST API and MySQL database underneath.",
    "Implemented JWT-based authentication and full CRUD for tasks; tested endpoints with Postman.",
]:
    story.append(Paragraph(f"• {b}", styles["item"]))
story.append(Spacer(1, 3))
story.append(two_col(Paragraph("HeartIQ — Cardiac Risk Prediction App | FastAPI, MongoDB, JavaScript", styles["jobtitle"]), Paragraph("May 2025 – Oct 2025", styles["jobdate"])))
for b in [
    "Designed REST endpoints with FastAPI and MongoDB serving heart-disease risk predictions.",
    "Performed EDA on patient health data; built a responsive JS frontend rendering results in real time.",
]:
    story.append(Paragraph(f"• {b}", styles["item"]))
story.append(Spacer(1, 3))
story.append(two_col(Paragraph("BankWise Loan Insights | SQL, Power BI, DAX, Power Query", styles["jobtitle"]), Paragraph("Apr 2025 – Aug 2025", styles["jobdate"])))
for b in [
    "Wrote SQL queries (joins, aggregations) and cleaned data with Power Query for reporting.",
    "Built an interactive Power BI dashboard with DAX measures tracking approvals and repayment trends.",
]:
    story.append(Paragraph(f"• {b}", styles["item"]))
story.append(Spacer(1, 3))
story.append(two_col(Paragraph("Technical SEO Campaigns — Portfolio &amp; WordPress Site", styles["jobtitle"]), Paragraph("2025 – 2026", styles["jobdate"])))
for b in [
    "Audited site structure, internal linking and indexing; monitored Search Console &amp; GA4.",
    "Executed keyword research, on-page optimization and backlink outreach by domain authority.",
]:
    story.append(Paragraph(f"• {b}", styles["item"]))

# Leadership
story += section("LEADERSHIP &amp; ACHIEVEMENTS")
story.append(two_col(Paragraph("<b>Team Lead</b> — Flipkart GRiD 5.0, Software Development Track", styles["jobtitle"]), Paragraph("2024", styles["jobdate"])))
story.append(Paragraph("• Led a team through a national-level software development competition, coordinating tasks, timelines and technical decisions.", styles["item"]))
story.append(Paragraph("• Participated in <b>National Space Hackathon 2025</b> at IIT Delhi and <b>Hansraj Innoverse 1.0</b>, 2025.", styles["item"]))

# Education
story += section("EDUCATION")
story.append(two_col(Paragraph("<b>NITRA Technical Campus, Ghaziabad</b> — B.Tech, Computer Science &amp; Engineering", styles["jobtitle"]), Paragraph("Aug 2022 – May 2026", styles["jobdate"])))
story.append(two_col(Paragraph("<b>New Angels Sr. Sec. School, Pratapgarh</b> — Intermediate", styles["jobtitle"]), Paragraph("2020 – 2021", styles["jobdate"])))

# Certifications
story += section("CERTIFICATIONS")
for c in [
    "Crash Course on Python Data Analytics — IBM",
    "Microsoft Azure SQL — Microsoft &amp; Infosys Springboard",
    "Web Development (Frontend Developer) — Oracle University",
    "Oracle Analytics Cloud 2025 Certified Professional — Oracle",
]:
    story.append(Paragraph(f"• {c}", styles["item"]))

story.append(Spacer(1, 4))
story.append(Paragraph("<b>Languages:</b> English (Full Professional) · Hindi (Native)", styles["item"]))

doc = SimpleDocTemplate(
    "/home/z/my-project/public/resume/Harsh_Tripathi_Resume.pdf",
    pagesize=A4,
    leftMargin=16*mm, rightMargin=16*mm, topMargin=13*mm, bottomMargin=13*mm,
    title="Harsh Tripathi — Resume",
    author="Harsh Tripathi",
)
doc.build(story)
print("Resume PDF generated.")
