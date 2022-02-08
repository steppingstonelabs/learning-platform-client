import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { AssessmentContext } from "../assessments/AssessmentProvider.js"
import { Record } from "../records/Record.js"
import { PeopleContext } from "./PeopleProvider.js"
import "./Student.css"

export const StudentOverview = ({ currentStudent }) => {
    const { activeStudent } = useContext(PeopleContext)
    const { getAssessments, assessments } = useContext(AssessmentContext)
    const [student, setStudent] = useState({})
    const [tab, changeTab] = useState()
    const history = useHistory()

    useEffect(() => {
        if ("id" in activeStudent) {
            setStudent(activeStudent)
            getAssessments(activeStudent.id)
        }
    }, [activeStudent])

    useEffect(() => {
        if (currentStudent) {
            setStudent(currentStudent)

        }
    }, [currentStudent])

    const createStatus = (status) => {
        let className = ""

        switch (status) {
            case "In Progress":
                className = "assessment--inProgress"
                break
            case "Ready for Review":
                className = "assessment--readyForReview"
                break
            case "Reviewed and Complete":
                className = "assessment--reviewedSuccess"
                break
            case "Reviewed and Incomplete":
                className = "assessment--reviewedFail"
                break
        }

        return (<div className={`assessment__status ${className}`}>
            {status}
        </div>)
    }

    return (
        "id" in student
            ? <div className="card student">
                <div className="card-body">
                    <header className="student__header">
                        <h2 className="card-title student__info">{student.name} ({student.cohorts.map(c => c.name).join(", ")})</h2>
                        <div className="student__score">
                            {student.score}
                        </div>
                    </header>
                    <div className="card-text">
                        <div className="student__github">
                            Github: <a href={`https://www.github.com/${student.github}`}>
                                {`https://www.github.com/${student.github}`}</a>
                        </div>

                        <button className="button button--isi button--border-thick button--round-l button--size-s button--record"
                            onClick={() => {
                                history.push(`/records/new/${student.id}`)
                            }}
                        >
                            <i className="button__icon icon icon-book"></i>
                            <span>New Objective Record</span>
                        </button>

                        <button className="button button--isi button--border-thick button--round-l button--size-s button--record"
                            onClick={() => {
                                history.push({
                                    pathname: "/feedback/new",
                                    state: {
                                        studentId: student.id
                                    }
                                })
                            }}
                        >
                            <i className="button__icon icon icon-write"></i>
                            <span>Send Feedback</span>
                        </button>

                        <ul className="tabs" role="tablist">
                            <li>
                                <input type="radio" name="tabs" id="tab1" defaultChecked />
                                <label htmlFor="tab1"
                                    role="tab"
                                    aria-selected="true"
                                    aria-controls="panel1"
                                    tabIndex="0">Objectives</label>
                                <div id="tab-content1"
                                    className="tab-content"
                                    role="tabpanel"
                                    aria-labelledby="description"
                                    aria-hidden="false">

                                    <section className="records--overview">
                                        {
                                            student.records.map(record => {
                                                return <Record key={`record--${record.id}`} record={record} />
                                            })
                                        }
                                    </section>
                                </div>
                            </li>

                            <li>
                                <input type="radio" name="tabs" id="tab2" />
                                <label htmlFor="tab2"
                                    role="tab"
                                    aria-selected="false"
                                    aria-controls="panel2"
                                    tabIndex="0">Assessments</label>
                                <div id="tab-content2"
                                    className="tab-content"
                                    role="tabpanel"
                                    aria-labelledby="specification"
                                    aria-hidden="true">
                                    <section className="records--overview">
                                        <div className="spanner">
                                            <button className="button button--isi button--border-thick button--round-l button--size-s button--assessment"
                                                onClick={() => {
                                                    history.push(`/records/new/${student.id}`)
                                                }}
                                            >
                                                <i className="button__icon icon icon-book"></i>
                                                <span>Send Assessment</span>
                                            </button>
                                        </div>

                                        {
                                            assessments.map(assessment => {
                                                return <div className="assessment" key={`assessment--${assessment.id}`}>
                                                    <div className="assessment__name">
                                                        {assessment.assessment.name}
                                                    </div>
                                                    {createStatus(assessment.status)}
                                                </div>
                                            })
                                        }
                                    </section>
                                </div>
                            </li>
                        </ul>


                    </div>
                </div>
            </div>
            : <div></div>
    )
}
