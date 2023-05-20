import React from 'react';

export default class Heart extends React.Component {

    onClick = () => {
        const { click } = this.props
        click && click();
    }

    render() {
        const { txt } = this.props;
        return <div className="heartWrapper">
            <div className="heart" onClick={this.onClick}></div>
            <div className="heart bounce" onClick={this.onClick}></div>
            <div className="txt" style={{ 'white-space': 'pre-line', color: '#333', position: 'fixed', right: '5%', bottom: '5%',
                'background-image': 'linear-gradient(to right, #0c02ba, #00ff95)',
                '-webkit-background-clip': 'text',
                '-webkit-text-fill-color': 'transparent' }}>{txt}</div>
        </div>
    }
}
