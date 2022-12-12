import React, { useContext, useState } from "react"
import { AssessmentIcon } from "../../svgs/AssessmentIcon.js"
import { EditIcon } from "../../svgs/EditIcon.js"
import { GlobeIcon } from "../../svgs/GlobeIcon.js"
import { NoteIcon } from "../../svgs/NoteIcon.js"
import { ProposalIcon } from "../../svgs/ProposalIcon.js"
import { TagIcon } from "../../svgs/TagIcon.js"
import { AssessmentContext } from "../assessments/AssessmentProvider.js"
import { CohortContext } from "../cohorts/CohortProvider.js"
import { CoreSkillSliders } from "./CoreSkillSliders.js"
import { PeopleContext } from "./PeopleProvider.js"
import { StudentDetails } from "./StudentDetails.js"
import { StudentTabList } from "./StudentTabList.js"
import "./Student.css"

export const Student = ({
    student, toggleProjects,
    toggleStatuses, toggleTags,
    toggleNote, toggleCohorts
}) => {
    const {
        activateStudent, setStudentCurrentAssessment,
        getCohortStudents, untagStudent, activeStudent,
        getStudentNotes, getStudentCoreSkills, getStudentProposals,
        proposals, getStudentLearningRecords, getStudentPersonality,
        getStudentObjectives
    } = useContext(PeopleContext)
    const { activeCohort } = useContext(CohortContext)
    const { getProposalStatuses } = useContext(AssessmentContext)

    const setAssessmentIndicatorBorder = (status) => {
        switch (status) {
            case 0:
                return ""
                break
            case 1:
                return "student--takingAssessment"
                break
            case 2:
                return "student--assessmentReviewNeeded"
                break
            case 3:
                return "student--assessReviewComplete"
                break
        }
    }

    return (
        <>
            <div className={`personality--${student.archetype} student ${setAssessmentIndicatorBorder(student.assessment_status)}`}>
                <div className="student__score--mini">
                    {student.score}
                </div>
                <div className="student__proposals">
                    {
                        student.proposals.map(p => {
                            if (p.status === "submitted") {
                                return <ProposalIcon key={`pendingProposal--${p.id}`} color="red" />
                            }
                            else if (p.status === "reviewed") {
                                return <ProposalIcon key={`reviewingProposal--${p.id}`} color="goldenrod" />
                            }
                            else if (p.status === "approved") {
                                return <ProposalIcon key={`completedProposal--${p.id}`} color="dodgerblue" />
                            }
                        })
                    }
                </div>
                <div className="student__header">
                    <h4 className="student__name"
                        onClick={() => {
                            activateStudent(student)
                            getStudentCoreSkills(student.id)
                            getStudentProposals(student.id)
                            getStudentLearningRecords(student.id)
                            getProposalStatuses()
                            getStudentPersonality(student.id)
                            document.querySelector('.overlay').style.display = "block"
                        }}
                    >{student.name}</h4>
                    <div className="student__book">
                        {student.book.name} <EditIcon helpFunction={() => {
                            activateStudent(student)
                            toggleProjects()
                        }} />
                    </div>
                    <div className="student__project">
                        {student.book.project}
                    </div>
                </div>
                <div className="student__footer">
                    <div className="action action--assessments">
                        <AssessmentIcon clickFunction={
                            () => {
                                activateStudent(student)
                                if (student.assessment_status === 0) {
                                    setStudentCurrentAssessment(student)
                                        .then(() => getCohortStudents(activeCohort.id))
                                }
                                else {
                                    toggleStatuses()
                                }
                            }
                        } tip={`${student.assessment_status === 0 ? "Assign book assessment to student" : "Update assessment status"}`} />
                    </div>
                    <div className="action action--notes">
                        <NoteIcon clickFunction={() => {
                            activateStudent(student)
                            getStudentNotes(student.id)
                            toggleNote()
                        }}
                            tip="Enter in your notes about this student" />
                    </div>
                    <div className="student__tag--add">
                        <TagIcon clickFunction={() => {
                            activateStudent(student)
                            toggleTags()
                        }} tip="Add a tag to this student" />
                    </div>
                </div>
                <div className="student__tags">
                    {
                        student.tags.map(tag => <span key={`tag--${tag.id}`}
                            onClick={() => {
                                untagStudent(tag.id).then(() => {
                                    getCohortStudents(activeCohort.id)
                                })
                            }}
                            className="student--tag">
                            {tag.tag.name}
                            <span className="delete clickable"
                                onClick={e => {
                                    e.stopPropagation()
                                    untagStudent(tag.id).then(() => {
                                        getCohortStudents(activeCohort.id)
                                    })
                                }}
                            >&times;</span>
                        </span>
                        )
                    }
                </div>
            </div>
        </>
    )
}
