import React from "react";

const Sidebar = ({ result }) => {
  console.log(result);
  if (
    !result.data ||
    !result.data.subTopics ||
    !result.data.questions ||
    !result.data.questions.short ||
    !result.data.questions.long
  ) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-xl">📌</span>
        <h3 className="text-lg font-semibold text-indigo-600">
          Quick Exam View
        </h3>
      </div>
      <section>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          ⭐ Subtopics:(Priority-wise)
        </p>
        {Object.entries(result.data.subTopics).map(([star, topic]) => (
          <div
            key={star}
            className="mb-3 rounded-lg bg-gray-50 border border-gray-200 p-3"
          >
            <p className="text-sm font-semibold text-yellow-600 mb-1">
              {star} Priority
            </p>
            <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
              {topic.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
        <p className="text-sm font-semibold text-gray-700 mb-1">
          🔥 Exam Importance
        </p>
        <span className="text-yellow-700 font-bold text-sm">
          {result.data.importance}
        </span>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          ❓ Important Questions:
        </p>
        <div className="mb-4 rounded-lg bg-indigo-50 border border-indigo-200 p-3">
          <p className="text-sm font-semibold text-indigo-700 mb-1">
            Short Questions
          </p>
          <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
            {result.data.questions.short.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4 rounded-lg bg-purple-50 border border-purple-200 p-3">
          <p className="text-sm font-semibold text-purple-700 mb-1">
            Long Questions
          </p>
          <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
            {result.data.questions.long.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
          <p className="text-sm font-semibold text-blue-700 mb-1">
            Diagram Question
          </p>
          <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
            <li>{result.data.questions.diagram}</li>
          </ul>
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default Sidebar;
