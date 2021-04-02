import fs from "fs";
import path from "path";

function buildPath() {
  return path.join(process.cwd(), "data", "feedbacks.json");
}

export function getAllFeedbacks() {
  const filePath = buildPath();
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

export function addFeedback(newFeedback) {
  const filePath = buildPath();
  const data = getAllFeedbacks();
  data.push(newFeedback);
  fs.writeFileSync(filePath, JSON.stringify(data));
}

export function removeFeedback(id) {
  const filePath = buildPath();
  let data = getAllFeedbacks();
  data = data.filter((d) => d.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data));
}
