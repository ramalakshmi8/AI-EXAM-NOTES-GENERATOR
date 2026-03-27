

// import PDFDocument from "pdfkit";

// export const pdfDownload = async (req, res) => {
//   try {
//     const { result } = req.body;
//     if (!result) return res.status(400).json({ error: "No content provided" });

//     const doc = new PDFDocument({ margin: 50 });
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       'attachment; filename="ExamNotesAI.pdf"',
//     );
//     doc.pipe(res);

//     // Title
//     doc.fontSize(20).text("ExamNotes AI", { align: "center" });
//     doc.moveDown();

//     // Importance
//     doc.fontSize(14).text(`Importance: ${result.data.importance || "N/A"}`);
//     doc.moveDown();

//     // Subtopics
//     if (result.subTopics) {
//       doc.fontSize(16).text("Sub Topics");
//       doc.moveDown(0.5);
//       Object.entries(result.subTopics).forEach(([star, topics]) => {
//         doc.fontSize(13).text(`${star} Topics:`);
//         topics?.forEach((t) => doc.fontSize(12).text(`• ${t}`));
//         doc.moveDown(0.5);
//       });
//     }

//     doc.moveDown();

//     // Notes
//     if (result.data.notes) {
//       doc.fontSize(16).text("Notes");
//       doc.moveDown(0.5);
//       doc.fontSize(12).text(result.data.notes.replace(/[*#]/g, ""));
//     }

//     doc.moveDown();

//     // Revision Points
//     if (result.data.revisionPoints?.length) {
//       doc.fontSize(16).text("Revision Points");
//       doc.moveDown(0.5);
//       result.data.revisionPoints.forEach((p) =>
//         doc.fontSize(12).text(`• ${p}`),
//       );
//     }

//     doc.moveDown();

//     // Questions
//     if (result.data.questions) {
//       doc.fontSize(16).text("Important Questions");
//       doc.moveDown(0.5);

//       doc.fontSize(13).text("Short Questions");
//       result.data.questions.short?.forEach((q) =>
//         doc.fontSize(12).text(`• ${q}`),
//       );

//       doc.moveDown(0.5);
//       doc.fontSize(13).text("Long Questions");
//       result.data.questions.long?.forEach((q) =>
//         doc.fontSize(12).text(`• ${q}`),
//       );

//       doc.moveDown(0.5);
//       doc.fontSize(13).text("Diagram Questions");
//       doc.fontSize(12).text(result.data.questions.diagram || "N/A");
//     }

//     doc.end();
//   } catch (error) {
//     console.error("PDF generation error:", error);
//     res.status(500).json({ error: "PDF generation failed" });
//   }
// };


import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
  try {
    const { result } = req.body;

    console.log("PDF BODY:", result); // 🔍 debug

    if (!result) {
      return res.status(400).json({ error: "No result provided" });
    }

    // 🔥 SAFE NORMALIZATION
    const data = result?.data ? result.data : result;

    // 🛑 EXTRA SAFETY
    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamNotesAI.pdf"'
    );

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("ExamNotes AI", { align: "center" });
    doc.moveDown();

    // ✅ SAFE ACCESS
    doc
      .fontSize(14)
      .text(`Importance: ${data?.importance || "N/A"}`);
    doc.moveDown();

    // Subtopics
    if (data?.subTopics) {
      doc.fontSize(16).text("Sub Topics");
      doc.moveDown(0.5);

      Object.entries(data.subTopics).forEach(([star, topics]) => {
        doc.fontSize(13).text(`${star} Topics:`);

        topics?.forEach((t) => {
          doc.fontSize(12).text(`• ${t}`);
        });

        doc.moveDown(0.5);
      });
    }

    doc.moveDown();

    // Notes
    if (data?.notes) {
      doc.fontSize(16).text("Notes");
      doc.moveDown(0.5);
      doc.fontSize(12).text(data.notes.replace(/[*#]/g, ""));
    }

    doc.moveDown();

    // Revision Points
    if (data?.revisionPoints?.length) {
      doc.fontSize(16).text("Revision Points");
      doc.moveDown(0.5);

      data.revisionPoints.forEach((p) => {
        doc.fontSize(12).text(`• ${p}`);
      });
    }

    doc.moveDown();

    // Questions
    if (data?.questions) {
      doc.fontSize(16).text("Important Questions");
      doc.moveDown(0.5);

      doc.fontSize(13).text("Short Questions");
      data.questions.short?.forEach((q) =>
        doc.fontSize(12).text(`• ${q}`)
      );

      doc.moveDown(0.5);

      doc.fontSize(13).text("Long Questions");
      data.questions.long?.forEach((q) =>
        doc.fontSize(12).text(`• ${q}`)
      );

      doc.moveDown(0.5);

      doc.fontSize(13).text("Diagram Questions");
      doc.fontSize(12).text(data.questions.diagram || "N/A");
    }

    // ✅ END ONLY ONCE
    doc.end();
  } catch (error) {
    console.error("PDF generation error:", error);

    // 🔥 IMPORTANT: don't send JSON after stream started
    if (!res.headersSent) {
      return res.status(500).json({ error: "PDF generation failed" });
    }
  }
};

