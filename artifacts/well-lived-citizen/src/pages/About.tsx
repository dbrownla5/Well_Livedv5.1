import { Link } from "wouter";

import { usePageMeta } from "../hooks/usePageMeta";

export default function About() {
  usePageMeta({
    title: "About Dayna Brown",
    description: "Fifteen years of large-scale operations leadership, now applied to your home and the practical layer of life. Los Angeles, CA.",
  });
  return (
    <div className="page">
      {/* HERO */}
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">Meet Dayna</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 0 }}>
            competence does not eliminate the need to be cared for.
          </h1>
        </div>
      </section>

      {/* BIO */}
      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="about-grid">
            <div>
              <div className="about-bio-copy" style={{ fontSize: "15px", lineHeight: 1.9, color: "var(--ink)" }}>
                <p style={{ marginBottom: "20px" }}>I have always been drawn to the life that lives inside people's most treasured possessions — the objects around which identity is formed, whether subtly or boldly.</p>

                <p style={{ marginBottom: "20px" }}>A jacket is never just clothing when it carries the memory of the woman who wore it and the nights she spent wrapped in it beside the love of her life.</p>

                <p style={{ marginBottom: "20px" }}>A record is never just vinyl when it still holds the rebellion, risk, and moment that brought it into the world — an era in which music helped bring authority to its knees.</p>

                <p style={{ marginBottom: "20px" }}>A closed closet door is never just storage when it still tells the story of a marriage, a career, a season of confidence, or the person someone once was.</p>

                <p style={{ marginBottom: "20px" }}>That instinct has followed me my entire life.</p>

                <p style={{ marginBottom: "20px" }}>Creating the time, space, and experience for people to discover the belongings that will become part of their own story has always felt deeply important to me.</p>

                <p style={{ marginBottom: "32px", fontSize: "17px", fontWeight: 600, color: "var(--char)", fontStyle: "italic" }}>That is the heart of this work.</p>

                <p style={{ marginBottom: "20px" }}>I do not believe people simply need help getting rid of things. I believe they need help understanding what those things mean, what they are worth, what they still have left to do, and where the next chapter of those belongings belongs.</p>

                <p style={{ marginBottom: "20px" }}>Sometimes that means preserving. Sometimes it means cataloging, resale, or making sure a family story does not disappear into a donation pile.</p>

                <p style={{ marginBottom: "20px" }}>The work is never really about the object. It is about protecting the life it represents.</p>

                <hr className="divider" style={{ margin: "40px 0" }} />

                <p style={{ marginBottom: "20px" }}>I came to understand the full weight of that truth in an entirely different way over the last year. After an unforeseen flood, I found myself moving through 13 temporary homes and Airbnbs, carrying only fragments of the life I thought I would always recognize.</p>

                <p style={{ marginBottom: "20px" }}>Years of belongings, valuables, and deeply personal objects were damaged or lost — many of them irreplaceable.</p>

                <p style={{ marginBottom: "20px" }}>What surprised me most was not only the grief of the loss itself, but the disorientation of living without the things that quietly reflect you back to yourself each day.</p>

                <p style={{ marginBottom: "20px" }}>When it was my life, my loss, my dog beside me in a storage unit, and no clear sense yet of what the next version of home would be, I came face to face with something essential.</p>

                <p style={{ marginBottom: "20px" }}>During that season, I was introduced to someone who, on paper, might have simply been called a home organizer. But what she offered was something far deeper. She stepped into the moments I could not hold alone. The decisions I was too depleted to make. The logistics I normally would have solved in seconds.</p>

                <p style={{ marginBottom: "20px", fontSize: "17px", fontWeight: 600, color: "var(--char)" }}>She was not organizing. She was relief.</p>

                <p style={{ marginBottom: "20px" }}>That experience changed the way I understand this work. Because when it is your own life in pieces, even the most capable person can lose access to their usual clarity. And in those moments, what matters most is not simply having someone who knows where things go. It is having someone who can step into the emotional and operational weight of transition and quietly help carry it with you.</p>

                <p style={{ marginBottom: "20px" }}>I do not see homes as projects. I see them as living systems shaped by identity, family, safety, and transition.</p>

                <p style={{ marginBottom: "20px" }}>My role is to step into complexity with calm, create clarity around belongings, preserve what matters, recover hidden value, and build elegant systems that help people move forward without losing the story of how they got here.</p>

                <p style={{ marginBottom: "32px", fontSize: "16px", fontWeight: 600, color: "var(--char)" }}>At the core, I believe the most meaningful work is helping people feel truly taken care of. That is what this business was built to do.</p>

                <Link href="/contact" className="btn btn-dark">Get in Touch</Link>
              </div>
            </div>

            {/* Photo + Background column */}
            <aside className="about-portrait-col">
              <div className="about-portrait-frame">
                <img src={`${import.meta.env.BASE_URL}images/dayna.jpg`} alt="Dayna Brown" className="about-portrait-img" />
              </div>
              <div className="about-portrait-meta">
                <div className="about-portrait-name">Dayna Brown</div>
                <div className="about-portrait-role">Founder, The Well Lived Citizen</div>
                <div className="about-portrait-role">Los Angeles, CA</div>
              </div>

              <div className="about-background">
                <div className="label about-background-label">Background</div>
                <p>For more than 15 years, I have built my career creating environments that help people function beautifully in real life. I have led large-scale operations, teams, and transformation initiatives for national brands, designing systems that solve invisible friction before it becomes visible failure.</p>
                <p>That same philosophy now lives inside The Well Lived Citizen.</p>
                <p>I bring together executive-level operational thinking, emotional discernment, resale and recoverable-value expertise, and a deep reverence for story, memory, and belonging.</p>
              </div>

              <div className="about-background">
                <div className="label about-background-label">Companies</div>
                <div className="cred-item">
                  <div className="cred-title">SVP Worldwide</div>
                  <div className="cred-meta">Regional Retail Director, West &amp; Central · 2023–2025<br />Singer, Husqvarna Viking, PFAFF</div>
                </div>
                <div className="cred-item">
                  <div className="cred-title">evo</div>
                  <div className="cred-meta">Senior Regional Director, Pacific Northwest · 2020–2023</div>
                </div>
                <div className="cred-item">
                  <div className="cred-title">The Collected Group</div>
                  <div className="cred-meta">Regional Brand Director, Southern California · 2016–2020<br />Joie, Equipment, Current/Elliott</div>
                </div>
                <div className="cred-item">
                  <div className="cred-title">BCBG Max Azria Group</div>
                  <div className="cred-meta">District Manager, Los Angeles · 2016–2018</div>
                </div>
                <div className="cred-item">
                  <div className="cred-title">Bonobos</div>
                  <div className="cred-meta">Guideshop Management, Southern California · 2014–2016</div>
                </div>
                <div className="cred-item">
                  <div className="cred-title">Nordstrom</div>
                  <div className="cred-meta">Retail Division Manager, Los Angeles · 2011–2014</div>
                </div>
              </div>

              <div className="about-background">
                <div className="label about-background-label">Patent</div>
                <div className="cred-solo">Invented and patented an outdoor retail solution prototype during my time at evo.</div>
              </div>

              <div className="about-background">
                <div className="label about-background-label">Well Dressed Citizen LLC</div>
                <div className="cred-solo">Founder &amp; Principal, 2020–present. Parent LLC of The Well Lived Citizen.</div>
              </div>

              <div className="about-background">
                <div className="label about-background-label">MAGIC Las Vegas</div>
                <div className="cred-solo">Keynote Speaker, 2023. The largest apparel and fashion trade show in the US.</div>
              </div>

              <div className="about-background">
                <div className="label about-background-label">Podcast</div>
                <div className="cred-solo">Featured Guest on Retail in America with Ron Thurston — NRF speaker and bestselling author of <em>Retail Pride</em>.</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
