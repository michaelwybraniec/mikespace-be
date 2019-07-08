import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import { getsBy, clears } from '../../../actions/global/global';

class ExpertReact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  };

  getCandidates (candidates) {
    return (
      <div>
        {
          (candidates) &&
          candidates
            .sort((c0, c1) => new Date(c1.createdAt) - new Date(c0.createdAt))
            .map((candidate, index) => {
              return (
                <div key={index}>
                  {index}{"  -  "}
                  {candidate.first_name}{" "}
                  {candidate.last_name}{" "}
                  {candidate.email}{" "}
                  {"Vote(s) : "}
                  {candidate.votes.length}
                </div>
              );
            })
        }
      </div>
    )
  };

  componentWillMount () {
    this.setState({ loading: true });
    // this.props.onGets("candidate", () => this.setState({ loading: false }));
  };

  loading = () => <div className="w-100"><div className="spinner-border text-secondary mx-auto" role="status"></div></div>;

  render () {

    var data = [
      {
        created: "2019-07-04",
        first_name: "Michael",
        last_name: "Wybraniec",
        email: "michauwybraniec@gmail.com",
        votes: ["_id:1", "_id:2", "_id:3", "_id:4", "_id:5"]
      },
      {
        created: "2019-06-23",
        first_name: "Tom",
        last_name: "Smiths",
        email: "toms@example.com",
        votes: ["_id:1", "_id:2"]
      }
    ];

    var candidates = this.props.candidates;

    // candidates = []; // No.Element test
    // candidates = data; // If the data is hardcoded

    return (
      <React.Fragment>

        {/* // If be api is connected */}
        {/* {(this.state.loading) && this.loading()}  */}

        {(this.state.loading) && (!candidates || !candidates.length) &&
          <div className="w-100 text-center text-secondary"><FormattedMessage id="No.Element" /></div>}

        {this.getCandidates(candidates)}

      </React.Fragment >
    )
  }
};

const mapStateToProps = state => {
  return {
    // if the be api stocks data in redux
    // candidates: state.global.candidates
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // if the be api responds with the data
    // onGetsBy: (objName, fields, values, callback) => dispatch(clears(objName, getsBy(objName, fields, values, callback))),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpertReact);
