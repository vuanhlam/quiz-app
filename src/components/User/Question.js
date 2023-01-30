import _ from 'lodash';

function Question(props) {
    const { data, index } = props;

    if (_.isEmpty(data)) {
        return <></>;
    }

    const handleCheckBox = (aId, qId) => {
        props.handleCheckBox(aId, qId)
    }

    return (
        <>
            {
                data.image 
                ?
                    <center>
                        <figure>
                            <img src={`data:image/png;base64, ${data.image}`} alt="question"/>
                        </figure>
                    </center>
                : 
                <div className='q-image'>

                </div>
            }
            
            <h2 className="question-title">
                <center>
                    <span>Question {index + 1}: </span>
                    <span className='quiz-title'>{data.questionDescription}</span>
                </center>
            </h2>
            <div className="answer">
                {data.answers &&
                    data.answers.length &&
                    data.answers.map((answer, index) => {
                        return (
                            <div key={`answer-${index}`} className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox"
                                    checked={answer.isSelected}
                                    onChange={(e) => handleCheckBox(answer.id, data.questionId)}
                                />
                                <label className="form-check-label" >
                                {answer.description}
                                </label>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default Question;
