const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateResaleAgreementPDF() {
  const publicDir = path.resolve(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const destPath = path.join(publicDir, "WLC-Resale-Agreement.pdf");
  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: 54, bottom: 54, left: 54, right: 54 },
    bufferPages: true,
  });

  const writeStream = fs.createWriteStream(destPath);
  doc.pipe(writeStream);

  // Styling Variables
  const primaryColor = "#2B2524"; // Ink
  const accentColor = "#5C6A62"; // Sage Dark
  const lightBgColor = "#F5F2EB"; // Warm grey / Parchment Mid
  const borderColor = "#E8E5DC"; // Warm grey light

  // Add flowable markdown list of sections
  const sections = [
    {
      title: "1. Scope of Service",
      text: "The Well Lived Citizen (\"Consultant\"), operated by Dayna Brown, provides curated resale and consignment services for items submitted by the Client. The Consultant will evaluate, photograph, research, prep, and list items on appropriate resale platforms based on her professional judgment and knowledge of current resale markets.\n\nThe Client is hiring the Consultant's professional judgment, presentation standards, operational systems, and resale experience — not a guaranteed outcome or price."
    },
    {
      title: "2. Commission Structure",
      text: "Commission is calculated on the net sale price — the gross sale price after platform fees, shipping costs, and approved transaction expenses are deducted before the split is applied. No upfront fees are charged. Commission is earned only upon a completed sale.\n\nPlatform fees, label costs, and approved courier expenses are deducted before the split. The Consultant will note the applicable platform and deduction structure in each payout summary.\n\nThe Low-Value Volume rate reflects a higher labor-to-return ratio on bags consisting primarily of items in the $5–$10 resale range. This tier is reviewed at intake, communicated before listing begins, and is never applied retroactively."
    },
    {
      title: "3. Item Evaluation & Acceptance",
      text: "The Consultant reserves the right to decline any item that, in her professional judgment, is unlikely to sell, is damaged beyond reasonable resale condition, or is a counterfeit or unauthorized reproduction.\n\nPickup and inventory confirmation do not constitute final acceptance for resale. Final evaluation occurs after unpacking, inspection, market review, prep review, viability assessment, and labor analysis. Items may be declined after pickup and prior to listing.\n\nItems declined for resale may be returned to the Client, donated, rerouted, or responsibly handled — at the Client's direction or as agreed during intake review. Items not retrieved within 14 days of decline notice may be donated or responsibly cleared after reasonable contact attempts."
    },
    {
      title: "4. Item Prep & Presentation",
      text: "The Consultant is authorized to make reasonable prep decisions where modest preparation meaningfully improves resale outcome. This may include lint rolling, steaming, polishing, spot treatment, leather care, minor repairs, and thoughtful presentation and packaging.\n\nPrep work is part of the service and is reflected in the commission structure. No additional charges are applied for standard prep. The Consultant will use professional judgment on what preparation is appropriate for each item."
    },
    {
      title: "5. Pricing & Platform Selection",
      text: "The Consultant determines listing price and platform selection based on market research, seasonality, buyer demand, and professional judgment. The Client may request a price floor for specific items in writing prior to listing. The Consultant is not obligated to accept price floor requests that would make a listing commercially unviable.\n\nResale pricing is not guaranteed. Results depend on market conditions, timing, buyer demand, platform behavior, comparable sales, presentation, category trends, and seasonality. There are no guaranteed outcomes, prices, timelines, or profit amounts."
    },
    {
      title: "6. Payout Schedule",
      text: "The 30-day consignment period begins upon listings report acknowledgement or 48-hour automatic consent. The Client's first payout will be issued on the first Monday following the close of that initial 30-day window, covering all completed sales to that point. Subsequent payouts are issued monthly — first Monday following each 30-day period.\n\nPayout timing reflects platform settlement schedules, which vary by marketplace. The Consultant will provide a sales summary with each payout. Months with no completed sales will receive a brief status update in lieu of a payout.\n\nNo payout is issued until a sale completes. There is no upfront payment or advance against projected sales."
    },
    {
      title: "7. Item Care & Liability",
      text: "The Consultant will handle all items with reasonable professional care consistent with the nature and apparent value of each piece. The Consultant is not liable for normal wear, minor handling variation, or loss due to circumstances beyond her control including carrier loss, platform transaction reversals, or buyer disputes resolved per platform policy.\n\nThe Well Lived Citizen does not carry consignment insurance. For items of significant documented value, the Client may wish to maintain their own coverage during the consignment period. The Consultant's liability is limited to the net proceeds that would have been due to the Client upon sale.\n\nThe Client warrants that all submitted items are their lawful property, free of any liens or encumbrances, and that the Client has the right to consign them."
    },
    {
      title: "8. Authentication Disclaimer",
      text: "The Well Lived Citizen may rely on tags, receipts, provenance documentation, market indicators, client representations, resale platform authentication tools, and professional resale experience when evaluating and listing items. The Consultant does not independently guarantee third-party authenticity unless expressly stated in writing.\n\nItems represented by the Client as authentic are listed in good faith based on that representation. The Client assumes responsibility for the accuracy of provenance and authenticity claims provided at intake."
    },
    {
      title: "9. Pickup Confirmation & Inventory Review",
      text: "At pickup, custody transfers to The Well Lived Citizen until items sell or until the 6-month check-in. Pickup confirmation — whether by photo, courier confirmation, or UPS delivery — serves as the record that custody transferred.\n\nWithin 48 hours of receipt, the Client receives an initial inventory confirmation including tote count, broad item summary, and category overview.\n\nFollowing inventory confirmation, a 7–10 business day evaluation period begins. The Consultant evaluates resale viability, pricing, and platform routing, and sends an Intake Report of recommended listings. The listings report serves as an acknowledgement of received inventory listing and establishes the Client's 48-hour window to ask to change prices or add sizing details. If the Consultant does not hear back within 48 hours, the intake automatically signs as consent, and items begin getting posted 24 hours later. Upon Listings Report sending, any items evaluated as damaged, dirty, or otherwise unsellable are handled at the sole discretion of the Consultant to donate or dispose of."
    },
    {
      title: "10. Unsold Items & 180-Day Review",
      text: "Most items with strong second-market demand sell within 6–9 months, though timing varies by category, pricing, seasonality, platform behavior, and buyer demand.\n\nAt approximately 180 days, the Consultant will contact the Client to review any remaining unsold inventory. At that time, the Client may elect to continue items in the active resale workflow, return items, donate, reroute, or otherwise handle as mutually agreed.\n\nThe Consultant will make reasonable attempts to contact the Client using the contact information on file before any rerouting, donation, or disposal decisions are finalized. Items not claimed or addressed within 30 days of the 180-day review notice may be donated, rerouted, or responsibly cleared at the Consultant's discretion.\n\nThe Well Lived Citizen is a curated resale service, not an indefinite storage service."
    },
    {
      title: "11. Storage & Retrieval",
      text: "Items awaiting pickup, declined at evaluation, or paused at Client request may be held for a limited operational window only. Retrieval must be coordinated within 14 days of the Consultant's notice unless otherwise agreed in writing. Items not retrieved within that window may be donated, rerouted, or responsibly cleared after reasonable contact attempts."
    },
    {
      title: "12. Item Provenance & Story Sharing",
      text: "Part of the value The Well Lived Citizen brings to curated resale — particularly for vintage, luxury, inherited, or one-of-a-kind pieces — is the story behind the item. Provenance, origin, and context are shared as part of the listing and sales process when they add value.\n\nBy default, the Consultant may share an item's history and contextual story in listings and buyer communications without identifying the Client by name. If the Client wishes to be identified by name in connection with specific items, they may authorize this in writing. If the Client prefers that no provenance be shared for specific items, they must note this at intake.\n\nClient contact information — name, address, email, phone — is never sold or shared for marketing purposes."
    },
    {
      title: "13. Content & Photography Release",
      text: "The Consultant may photograph, style, and document items for use in listings, business marketing, social media, and portfolio content. This includes item photography, packaging, curation imagery, before/after details, and listing screenshots. No Client names, addresses, or identifying personal information will be included in any public-facing content.\n\nThe Client consents to this use by signing this agreement. If the Client wishes to exclude specific items from any public content use, they must note this at intake."
    },
    {
      title: "14. Tax Responsibility",
      text: "The Client is the seller of record for all items consigned through this agreement. Any tax obligations arising from resale proceeds are solely the Client's responsibility. The Well Lived Citizen is an independent contractor and reseller — not a payment processor, employer, or tax agent. No tax advice is provided and no tax documents will be issued by The Well Lived Citizen in connection with resale proceeds."
    },
    {
      title: "15. Termination",
      text: "Either party may terminate this agreement with 7 days written notice. Upon termination, unsold items will be returned to the Client within 14 days. Items already listed or in active transit at the time of termination will be handled to completion under the original commission terms."
    },
    {
      title: "16. Governing Law",
      text: "This agreement is governed by the laws of the State of California. Any disputes will be resolved in Los Angeles County."
    }
  ];

  // Helper: Heading
  function renderHeader() {
    doc.fillColor(accentColor).fontSize(9).font("Helvetica-Bold").text("THE WELL LIVED CITIZEN", { letterSpacing: 1.5, align: "center" });
    doc.fillColor(primaryColor).fontSize(16).font("Helvetica-Bold").text("Consignment Agreement", { align: "center", spaceAfter: 15 });
    
    doc.strokeColor(borderColor).lineWidth(1).moveTo(54, doc.y).lineTo(558, doc.y).stroke();
    doc.moveDown(1.5);
  }

  // Draw Page 1 Header and Metadata
  renderHeader();

  // Draw Intake Meta Blank fields
  const topY = doc.y;
  const colWidth = 240;
  
  doc.font("Helvetica-Bold").fontSize(9).fillColor(accentColor);
  doc.text("CLIENT NAME:", 54, topY);
  doc.strokeColor(borderColor).lineWidth(0.5).moveTo(130, topY + 8).lineTo(558, topY + 8).stroke();
  
  doc.text("CLIENT EMAIL:", 54, topY + 22);
  doc.strokeColor(borderColor).lineWidth(0.5).moveTo(135, topY + 30).lineTo(558, topY + 30).stroke();

  doc.text("PHONE / CONTACT:", 54, topY + 44);
  doc.strokeColor(borderColor).lineWidth(0.5).moveTo(150, topY + 52).lineTo(558, topY + 52).stroke();

  doc.text("INTAKE REFERENCE:", 54, topY + 66);
  doc.strokeColor(borderColor).lineWidth(0.5).moveTo(155, topY + 74).lineTo(558, topY + 74).stroke();

  doc.text("DATE:", 54, topY + 88);
  doc.strokeColor(borderColor).lineWidth(0.5).moveTo(90, topY + 96).lineTo(558, topY + 96).stroke();

  doc.y = topY + 115;
  doc.moveDown();

  // Loop & Render Sections beautifully
  sections.forEach((s) => {
    // Check height to avoid orphan headings
    const nextItemHeight = 110; 
    if (doc.y + nextItemHeight > 738) {
      doc.addPage();
      renderHeader();
    }

    // Title
    doc.fillColor(primaryColor).fontSize(11).font("Helvetica-Bold").text(s.title);
    doc.moveDown(0.4);

    // Body text
    doc.fillColor(primaryColor).fontSize(9.5).font("Helvetica").text(s.text, {
      lineGap: 3,
      align: "justify",
    });
    doc.moveDown(1.5);

    // If it's Section 2, render the stylized commission table
    if (s.title.includes("2. Commission Structure")) {
      const tableHeight = 155;
      if (doc.y + tableHeight > 738) {
        doc.addPage();
        renderHeader();
      }

      // Draw table title
      doc.fillColor(accentColor).fontSize(8.5).font("Helvetica-Bold").text("COMMISSION CORRELATIONS", { letterSpacing: 1 });
      doc.moveDown(0.5);

      // Render Table Header
      const tableY = doc.y;
      doc.rect(54, tableY, 504, 20).fill(lightBgColor);
      
      doc.fillColor(primaryColor).fontSize(8.5).font("Helvetica-Bold");
      doc.text("Category", 64, tableY + 6, { width: 220 });
      doc.text("Client Split", 295, tableY + 6, { width: 100 });
      doc.text("WLC Split", 405, tableY + 6, { width: 100 });

      // Rows
      const rows = [
        ["Clothing & Accessories", "45%", "55%"],
        ["Designer & Luxury", "50%", "50%"],
        ["Furniture & Significant Home Pieces", "50%", "50%"],
        ["Full Closet Liquidation", "45%", "55%"],
        ["Low-Value Volume (Items in the $5–$10 range)", "35%", "65%"]
      ];

      let currentRowY = tableY + 20;
      doc.font("Helvetica").fontSize(8.5);
      
      rows.forEach((row, rowIndex) => {
        // Row background alternating
        if (rowIndex % 2 === 1) {
          doc.rect(54, currentRowY, 504, 22).fill("#FAFAF7");
        }
        
        doc.fillColor(primaryColor);
        doc.text(row[0], 64, currentRowY + 6, { width: 220 });
        doc.text(row[1], 295, currentRowY + 6, { width: 100 });
        doc.text(row[2], 405, currentRowY + 6, { width: 100 });

        // Row Separator line
        doc.strokeColor(borderColor).lineWidth(0.5).moveTo(54, currentRowY + 22).lineTo(558, currentRowY + 22).stroke();
        currentRowY += 22;
      });

      doc.y = currentRowY + 15;
    }
  });

  // Check height before rendering signatures
  const sigHeight = 180;
  if (doc.y + sigHeight > 738) {
    doc.addPage();
    renderHeader();
  }

  // Draw Signatures Block
  doc.strokeColor(borderColor).lineWidth(1).moveTo(54, doc.y).lineTo(558, doc.y).stroke();
  doc.moveDown(2);

  const sigY = doc.y;
  
  // Client sign column
  doc.fillColor(primaryColor).fontSize(10).font("Helvetica-Bold").text("CLIENT SIGNATURE", 54, sigY);
  doc.strokeColor(accentColor).lineWidth(0.5).moveTo(54, sigY + 50).lineTo(254, sigY + 50).stroke();
  
  doc.fontSize(8.5).font("Helvetica").fillColor(accentColor);
  doc.text("Printed Name: __________________________", 54, sigY + 62);
  doc.text("Date: _________________________________", 54, sigY + 78);

  // WLC sign column
  doc.fillColor(primaryColor).fontSize(10).font("Helvetica-Bold").text("FOR THE WELL LIVED CITIZEN", 308, sigY);
  doc.strokeColor(accentColor).lineWidth(0.5).moveTo(308, sigY + 50).lineTo(508, sigY + 50).stroke();
  
  doc.fontSize(8.5).font("Helvetica").fillColor(accentColor);
  doc.text("Dayna Brown, Founder", 308, sigY + 62);
  doc.text("Date: _________________________________", 308, sigY + 72);

  // Global Footer Handler (Page Numbers)
  const range = doc.bufferedPageRange();
  for (let i = range.start, end = range.start + range.count; i < end; i++) {
    doc.switchToPage(i);
    doc.fillColor("#9E988F").fontSize(7.5).font("Helvetica");
    
    // Bottom centered footer
    doc.text(
      `The Well Lived Citizen  •  Consignment Agreement  •  Page ${i + 1} of ${range.count}`,
      54,
      745,
      { align: "center", width: 504 }
    );
  }

  doc.end();
  
  writeStream.on("finish", () => {
    console.log("WLC Resale Agreement PDF drawn successfully.");
  });
}

generateResaleAgreementPDF();
