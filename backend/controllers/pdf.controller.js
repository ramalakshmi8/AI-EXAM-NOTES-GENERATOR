// import PDFDocument from "pdfkit";
// export const pdfDownload = async (req, res) => {
//   const { result } = req.body;
//   if (!result) {
//     return res.status(400).json({ error: "no content provided" });
//   }
//   const doc = new PDFDocument({ margin: 50 });
//   res.setHeader("Content-Type", "Application/pdf");
//   res.setHeader("Content-disposition", "attachment;filename='ExamNotesAI.pdf'");
//   doc.pipe(res);
//   doc.fontSize(20).text("ExamNotes AI", { align: "center" });
//   doc.moveDown();
//   doc.fontSize(14).text(`importance:${result.data.importance}`);
//   doc.moveDown();
//   //subTopics
//   doc.fontSize(16).text("Sub Topics");
//   doc.moveDown(0.5);
//   Object.entries(result.subTopics).forEach(([star, topics]) => {
//     doc.moveDown(0.5);
//     doc.fontSize(13).text(`${star} Topics:`);
//     topics.forEach((t) => {
//       doc.fontSize(12).text(`.${t}`);
//     });
//   });
//   doc.moveDown();

//   //Notes
//   doc.fontSize(16).text("Notes");
//   doc.moveDown(0.5);
//   doc.fontSize(12).text(result.data.notes.replace(/[*#]/g, ""));
//   doc.moveDown();
//   //Revision Points
//   doc.fontSize(16).text("Revision Points");
//   doc.moveDown(0.5);
//   result.data.revisionPoints.map((p) => {
//     doc.fontSize(12).text(`.${p}`);
//   });
//   doc.moveDown();
//   //questions
//   doc.fontSize(16).text("Important Questions");
//   doc.moveDown(0.5);
//   doc.fontSize(13).text("Short Questions");
//   result.data.questions.short.forEach((q) => {
//     doc.fontSize(12).text(`.${q}`);
//   });
//   doc.moveDown(0.5);
//   doc.fontSize(13).text("Long Questions");
//   result.data.questions.long.forEach((q) => {
//     doc.fontSize(12).text(`.${q}`);
//   });
//   doc.moveDown(0.5);
//   doc.fontSize(13).text("Diagram Questions");
//   doc.fontSize(12).text(result.data.questions.diagram);
//   doc.moveDown(0.5);

//   doc.end();
// };

import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
  try {
    // const { result } = req.body;

    // if (!result) {
    //   return res.status(400).json({ error: "No content provided" });
    // }

    // const doc = new PDFDocument({ margin: 50 });

    // // Proper headers
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader(
    //   "Content-Disposition",
    //   'attachment; filename="ExamNotesAI.pdf"',
    // );

    // doc.pipe(res);

    // // Title
    // doc.fontSize(20).text("ExamNotes AI", { align: "center" });
    // doc.moveDown();

    // // Importance
    // doc.fontSize(14).text(`Importance: ${result.importance || "N/A"}`);
    // doc.moveDown();

    // // SubTopics
    // if (result.subTopics) {
    //   doc.fontSize(16).text("Sub Topics");
    //   doc.moveDown(0.5);

    //   Object.entries(result.subTopics).forEach(([star, topics]) => {
    //     doc.fontSize(13).text(`${star} Topics:`);
    //     topics?.forEach((t) => {
    //       doc.fontSize(12).text(`• ${t}`);
    //     });
    //     doc.moveDown(0.5);
    //   });
    // }

    // doc.moveDown();

    // // Notes
    // if (result.notes) {
    //   doc.fontSize(16).text("Notes");
    //   doc.moveDown(0.5);
    //   doc.fontSize(12).text(result.notes.replace(/[*#]/g, ""));
    // }

    // doc.moveDown();

    // // Revision Points
    // if (result.revisionPoints?.length) {
    //   doc.fontSize(16).text("Revision Points");
    //   doc.moveDown(0.5);

    //   result.revisionPoints.forEach((p) => {
    //     doc.fontSize(12).text(`• ${p}`);
    //   });
    // }

    // doc.moveDown();

    // // Questions
    // if (result.questions) {
    //   doc.fontSize(16).text("Important Questions");
    //   doc.moveDown(0.5);

    //   doc.fontSize(13).text("Short Questions");
    //   result.questions.short?.forEach((q) => {
    //     doc.fontSize(12).text(`• ${q}`);
    //   });

    //   doc.moveDown(0.5);

    //   doc.fontSize(13).text("Long Questions");
    //   result.questions.long?.forEach((q) => {
    //     doc.fontSize(12).text(`• ${q}`);
    //   });

    //   doc.moveDown(0.5);

    //   doc.fontSize(13).text("Diagram Questions");
    //   doc.fontSize(12).text(result.questions.diagram || "N/A");
    // }

    // doc.end();

    const { result } = req.body;
    if (!result) return res.status(400).json({ error: "No content provided" });

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamNotesAI.pdf"',
    );
    doc.pipe(res);

    // Title
    doc.fontSize(20).text("ExamNotes AI", { align: "center" });
    doc.moveDown();

    // Importance
    doc.fontSize(14).text(`Importance: ${result.data.importance || "N/A"}`);
    doc.moveDown();

    // Subtopics
    if (result.subTopics) {
      doc.fontSize(16).text("Sub Topics");
      doc.moveDown(0.5);
      Object.entries(result.subTopics).forEach(([star, topics]) => {
        doc.fontSize(13).text(`${star} Topics:`);
        topics?.forEach((t) => doc.fontSize(12).text(`• ${t}`));
        doc.moveDown(0.5);
      });
    }

    doc.moveDown();

    // Notes
    if (result.data.notes) {
      doc.fontSize(16).text("Notes");
      doc.moveDown(0.5);
      doc.fontSize(12).text(result.data.notes.replace(/[*#]/g, ""));
    }

    doc.moveDown();

    // Revision Points
    if (result.data.revisionPoints?.length) {
      doc.fontSize(16).text("Revision Points");
      doc.moveDown(0.5);
      result.data.revisionPoints.forEach((p) =>
        doc.fontSize(12).text(`• ${p}`),
      );
    }

    doc.moveDown();

    // Questions
    if (result.data.questions) {
      doc.fontSize(16).text("Important Questions");
      doc.moveDown(0.5);

      doc.fontSize(13).text("Short Questions");
      result.data.questions.short?.forEach((q) =>
        doc.fontSize(12).text(`• ${q}`),
      );

      doc.moveDown(0.5);
      doc.fontSize(13).text("Long Questions");
      result.data.questions.long?.forEach((q) =>
        doc.fontSize(12).text(`• ${q}`),
      );

      doc.moveDown(0.5);
      doc.fontSize(13).text("Diagram Questions");
      doc.fontSize(12).text(result.data.questions.diagram || "N/A");
    }

    doc.end();
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ error: "PDF generation failed" });
  }
};
