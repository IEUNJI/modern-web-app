import React from 'react';

class Detail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="detail-page">
        {
          this.props.match.params.id
        }
      </div>
    );
  }
}

export default Detail;
