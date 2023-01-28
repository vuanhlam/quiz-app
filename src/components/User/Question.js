import _ from 'lodash';

function Question(props) {
    const { data, index } = props;

    if (_.isEmpty(data)) {
        return <></>;
    }

    return (
        <>
            {
                data.image && <figure>
                                 <img src={`data:image/png;base64, ${data.image}`} alt="question"/>
                              </figure>
            }
            
            <h2 className="question-title">
                <span>Question {index + 1}: </span>
                <span>{data.questionDescription}</span>
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
                                    value="" 
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
