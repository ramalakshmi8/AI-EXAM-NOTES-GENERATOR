import axios from "axios";
import { serverUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";
export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(serverUrl + "/api/user/currentuser", {
      withCredentials: true,
    });
    console.log(result.data);
    dispatch(setUserData(result.data));
    // return result.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      serverUrl + "/api/notes/generate-notes",
      payload,
      {
        withCredentials: true,
      },
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.error("Generate Notes API Error:", err.message);
    throw new Error("Failed to generate notes");
  }
};
export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(
      serverUrl + "/api/pdf/generate-notes",
      { result },
      { responseType: "blob", withCredentials: true },
    );
    const blob = new Blob([response.data], { type: "application/pdf" });
    const Url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = Url;
    link.download = "ExamNotesAI.pdf";
    link.click();
    window.URL.revokeObjectURL(Url);
  } catch (error) {
    throw new Error("PDF download failed");
  }
};
