import React from 'react';
import StyleEditor from './styleEditor';
import Heart from './heart';
import HeartRain from './heartRain';

const isPc = (function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}());

export default class App extends React.Component {

    fullStyle = [
        `/*
* Hello！
* 520也不知道送你什么(￣y▽,￣)╭ 
* 就送你一个不一样的礼物吧哈哈ヾ(≧▽≦*)o。
* 之前不是要教你写代码吗
* 诶，就在今天啦(❤️´艸｀❤️)。
* 嗯。说起来手机和电脑还得区分一下。
* 你现在用的是。。。${isPc ? '电脑' : '手机'}
*/

/* 首先给所有元素加上过渡效果 */
* {
  -webkit-transition: all .5s;
  transition: all .5s;
}

/* 白色背景太单调了。来点背景 */
body, html {
  color: #fff;
  background-color: darkslategray;
}

/* 边听歌边看吧 */
.music { 
    top: 18%;
    right: ${isPc ? '55%' : '-25%'} !important;
    z-index: 999;
    transform: ${isPc ? 'rotate(0deg)' : 'rotate(90deg)'} !important;
    border-radius: 10px; 
    border: 1px solid #bacd6d;
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to right, #9ef18f, #ffffff); 
}

/* 文字太近了 */
.styleEditor {
  overflow: auto;
  ${ isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;` }
  border: 1px solid;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px;
}

/* 这些代码颜色都一样。加点儿高亮区别来 */
.token.selector{ color: rgb(133,153,0) }
.token.property{ color: rgb(187,137,0) }
.token.punctuation{ color: yellow }
.token.function{ color: rgb(42,161,152) }
.token.comment{ color: rgb(177,177,177) }

/* 加个 3D 效果 */
html{
  perspective: 1000px;
  -webkit-perspective: 1000px;
}

.styleEditor {
  ${ isPc ? `transform: rotateY(10deg) translateZ(-100px) ;
  -webkit-transform: rotateY(10deg) translateZ(-100px);` : `transform: rotateX(-10deg) translateZ(-100px);
  -webkit-transform: rotateX(-10deg) translateZ(-100px);` } ${ isPc ? '' : `
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;` }
}

/*
* 用代码画一个爱心。
*/

/* 首先，来一个画板 */
.heartWrapper {
  ${ isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;`}
  position: relative;
  border: 1px solid;
  background-color: white;
  ${ isPc ?
  `transform: rotateY(-10deg) translateZ(-100px);
  -webkit-transform: rotateY(-10deg) translateZ(-100px);` :
  `transform: rotateX(10deg) translateZ(-100px);
  -webkit-transform: rotateX(10deg) translateZ(-100px);`}${ isPc ? '' :`
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;`}
}

/* 画一个方块，当左心室和右心室 */
.heart {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
  border-radius: 20px;
  background: #E88D8D;
  transform: rotate(45deg);
}

/* 画上左心房 */
.heart::before {
  content: '';
  background: #E88D8D;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  left: -38px;
  top: 1px;
}

/* 再画上右心房 */
.heart::after {
  content: '';
  background: #E88D8D;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  right: -1px;
  top: -38px;
}

/* 太单调了，让心跳动起来 */
@keyframes throb {
  0% {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }

  100% {
    transform: scale(1.65) rotate(45deg);
    opacity: 0
  }
}

.bounce {
  opacity: 0.2;
  animation: throb 1s infinite linear;
}
/*
* Ok，完成！
* 520快乐！！！
* 希望你天天开心
*/

`
    ]

    fullTxt = '祝你今天开心快乐\r\n' +
      '你明天的愉快留着我明天再祝(❁´◡`❁)。'

    state = {
        currentStyleCode: '',
        finished: false,
        heartRains: [],
        txt: ''
    }

    interval = 50;
    // interval = 0;

    async progressiveShowStyle(n = 0) {
        const {
            interval,
            fullStyle
        } = this;
        const showStyle = i => new Promise((resolve) => {
            const style = fullStyle[n];
            const char = style[i];
            if (!style || !char) {
                resolve();
                return;
            }
            let {
                currentStyleCode
            } = this.state;
            // 计算前 n 个 style 的字符总数
            let length = this.fullStyle.filter((_, index) => index <= n).map((item) => item.length).reduce((p, c) => p + c, 0)
            let prefixLength = length - style.length
            if(currentStyleCode.length < length) {
                let l = currentStyleCode.length - prefixLength
                let char = style.substring(l, l + 1) || ' '
                currentStyleCode += char;
                this.setState({
                    currentStyleCode
                });

                if (char === '\n' && this.styleEditor) {
                    this.styleEditor.toBottom();
                }

                // setTimeout(showStyle, interval)
                setTimeout(() => {
                    resolve(showStyle(i + 1))
                }, interval);
            }else{
                resolve()
            }
        });
        return showStyle(0);
    }

    async progressivelyShowResume() {
        return new Promise((resolve, reject) => {
            let length = this.fullTxt.length
            let interval = 100
            let {
                txt
            } = this.state;
            let showResume = () => {
                if (txt.length < length) {
                    txt = this.fullTxt.substring(0, txt.length + 1)
                    this.setState({
                        txt
                    });
                    let lastChar = txt[txt.length - 1]
                    let prevChar = txt[txt.length - 2]
                    // if (prevChar === '\n' && this.$refs.resumeEditor) {
                    //     this.$nextTick(() => this.$refs.resumeEditor.goBottom())
                    // }
                    setTimeout(showResume, interval)
                } else {
                    resolve()
                }
            }
            showResume()
        })
    }

    async componentDidMount() {
        await this.progressiveShowStyle(0);
        await this.progressivelyShowResume();
        this.setState({finished: true});
        this.rain();
    }

    saveStyleEditorRef = child => this.styleEditor = child;

    rain = () => {
        let { heartRains } = this.state;
        const rainNum = 30;
        const stayTime = rainNum * 200 + 1000 + 4000;
        const time = (new Date()).getTime();
        if (!heartRains.length || (time - heartRains[heartRains.length - 1].time > (stayTime / 2))) {
            heartRains.push({time, rainNum});
            this.setState({heartRains});
            setTimeout(() => {
                this.removeRain(time);
            }, stayTime);
        }
    }

    removeRain(time) {
        let { heartRains } = this.state;
        heartRains = heartRains.filter(item => item.time !== time);
        this.setState({heartRains});
    }

    render() {
        const { currentStyleCode, finished, heartRains, txt } = this.state;
        return <div>
            <div style = {{display: isPc ? 'flex' : ''}}>
                <StyleEditor ref={this.saveStyleEditorRef} code={currentStyleCode}/>
                <Heart click={finished ? this.rain: null} txt={txt}/>
            </div>
            {
                heartRains.map(item => <HeartRain num={item.rainNum} key={item.time}/>)
            }
        </div>;
    }
}
