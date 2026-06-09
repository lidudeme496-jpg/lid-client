import { Temporal } from "@js-temporal/polyfill";
import type{ Student } from "./models/student.model.js";
const student: Student = {
id: "STU-001",
name: "Hana Tadesse",
enrollmentDate: Temporal.Now.instant(),
};

// Try these what does the compiler say?
student.id = "STU-999";
//console.log(student.gpa.toFixed(2));
console.log(student.gpa?.toFixed(2) ?? "Not yet graded");
function processStudent(student: Student) {
    console.log(`Student ${student.name} GPA: ${student.gpa?.toFixed(2) ?? "Not yet graded"}`);
}
// Prints: Student Hana GPA: 3.70
processStudent(42);
import { parseStudent } from "./models/student.model.js";
console.log(parseStudent({ id: "STU-001", name: "Hana" }));
// Prints a valid Student object
parseStudent({ id: 42, name: "Test" });
// Prints: Invalid student data received
import { AssessmentItem, calculateGrade } from "./models/assessment.model.js";
const quiz: AssessmentItem = {
id: "QUIZ-001",
kind: "quiz",
title: "SQL Basics",
correctAnswers: 8,
totalQuestions: 10,
};
const lab: AssessmentItem = {
id: "LAB-001",
kind: "lab",
title: "REST API Project",
functionalityScore: 85,
codeQualityScore: 90,
};
console.log(`Quiz grade: ${calculateGrade(quiz)}%`); // 80
console.log(`Lab grade: ${calculateGrade(lab)}%`); // 87
// Verify readonly try this line and check the compiler error:
quiz.id = "QUIZ-999";
interface EnrollmentBad {
isPending: boolean;
isApproved: boolean;
isActive: boolean;
isCompleted: boolean;
isDropped: boolean;
}
const pending: EnrollmentStatus = {
status: "PENDING",
requestedAt: Temporal.Now.instant(),
studentId: "STU-001",
courseId: "CRS-101",
};
console.log(describeEnrollment(pending));
import { CourseStatus, describeCourse } from "./models/course.model.js";
const webDev: CourseStatus = {
status: "ACTIVE",
enrolledCount: 28,
startDate: Temporal.PlainDate.from("2026-09-01"),
};
console.log(describeCourse(webDev));
import { ApiResponse, renderResponse } from "./models/api-response.model.js";
import { Student } from "./models/student.model.js";
import { Course } from "./models/course.model.js";
const studentRes: ApiResponse<Student> = {
status: "success",
data: {
id: "STU-001",
name: "Dawit Bekele",
enrollmentDate: Temporal.Now.instant(),
gpa: 3.4,
},
fetchedAt: Temporal.Now.instant(),
};
console.log(
renderResponse(studentRes, (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`),
);
// Nowtest with a different data type
const courseListRes: ApiResponse<Course[]> = {
status: "success",
data: [
{
id: "CRS-101",
title: "Web Development Fundamentals",
capacity: 30,
startDate: Temporal.PlainDate.from("2026-09-01"),
},
],
fetchedAt: Temporal.Now.instant(),
};
console.log(
renderResponse(courseListRes, (courses) =>
courses.map((c) => c.title).join(", "),
),
);
const approvedAt = Temporal.Now.instant();
console.log(`Approved at (UTC): ${approvedAt}`);
// 2. Display in local timezone
const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");
console.log(`Addis: ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`);
// Same moment, different wall-clock time
// 3. Course start date (date only, no time)
const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();
const daysUntilStart = today.until(courseStart).total({ unit: "days" });
console.log(`${Math.floor(daysUntilStart)} days until course starts`);
// 4. Assignment deadline duration
const deadline = Temporal.PlainDate.from("2026-12-15");
const remaining = today.until(deadline);
console.log(
`${remaining.total({ unit: "days" })} days until assignment is due`,
);