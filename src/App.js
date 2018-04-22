import React, {Component} from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {array: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], message: '点击开始游戏'};
    }

    componentDidMount() {
        let that = this;
        this.keyPressListener = function (e) {
            that.keyPress(e);
        };
        window.addEventListener('keydown', this.keyPressListener);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyPressListener);
    }

    render() {
        let tr = [];
        for (let i = 0; i < 4; i++) {
            let td = [];
            for (let j = 0; j < 4; j++) {
                td.push(<td className={'tile-' + this.state.array[i][j]}
                            key={i + '' + j}>{this.state.array[i][j] === 0 ? ' ' : this.state.array[i][j]}</td>)
            }
            tr.push(<tr key={i}>{td}</tr>);
        }
        return (
            <div className='container'>
                <table className='game' cellSpacing="10">
                    <tbody>
                    {tr}
                    </tbody>
                </table>
                <div className='text-box'
                     style={{display: this.state.message.length ? 'block' : 'none'}} onClick={() => this.newGame()}>
                    <p className='message'>{this.state.message}</p>
                </div>
            </div>
        );
    }

    newNumber() {
        let list = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (!this.state.array[i][j]) {
                    list.push(i + '-' + j);
                }
            }
        }
        if (list.length) {
            let res = list[Math.floor(Math.random() * list.length)];
            let state = Object.assign({}, this.state);
            state.array[res.charAt(0)][res.charAt(2)] = Math.random() < 0.2 ? 4 : 2;
            this.setState(state);
        }
        return list.length - 1;
    }

    keyPress(e) {
        let canmove = false;
        let arr = this.state.array;
        switch (e.keyCode) {
            //上
            case 38:
                for (let j = 0; j < 4; j++) {
                    for (let i = 0; i < 4; i++) {
                        let k = i;
                        while (!arr[k][j]) {
                            k++;
                            if (k === 4) break;
                        }
                        if (k === 4) break;
                        if (k > i) {
                            canmove = true;
                            arr[i][j] = arr[k][j];
                            arr[k][j] = 0;
                        }
                    }
                    for (let i = 0; i < 3; i++) {
                        if (arr[i][j] > 0 && arr[i][j] === arr[i + 1][j]) {
                            canmove = true;
                            break;
                        }
                    }
                }
                if (!canmove) {
                    return false;
                }
                for (let j = 0; j < 4; j++) {
                    for (let i = 0; i < 3; i++) {

                        if (arr[i][j] === arr[i + 1][j]) {
                            arr[i][j] <<= 1;
                            let c = i;
                            while (arr[c][j]) {
                                c++;
                                if (c === 3) {
                                    arr[c][j] = 0;
                                    break;
                                }
                                arr[c][j] = arr[c + 1][j];
                            }
                        }
                    }
                }
                break;
            // 下
            case 40:
                for (let j = 0; j < 4; j++) {
                    for (let i = 3; i >= 0; i--) {
                        let k = i;
                        while (!arr[k][j]) {
                            k--;
                            if (k === -1) break;
                        }
                        if (k === -1) break;
                        if (k < i) {
                            canmove = true;
                            arr[i][j] = arr[k][j];
                            arr[k][j] = 0;
                        }
                    }
                    for (let i = 3; i >= 1; i--) {
                        if (arr[i][j] > 0 && arr[i][j] === arr[i - 1][j]) {
                            canmove = true;
                            break;
                        }
                    }
                }
                if (!canmove) {
                    return false;
                }
                for (let j = 0; j < 4; j++) {
                    for (let i = 3; i > 0; i--) {
                        if (arr[i][j] === arr[i - 1][j]) {
                            arr[i][j] <<= 1;
                            let
                                c = i;
                            while (arr[c][j]) {
                                c--;
                                if (c === 0) {
                                    arr[c][j] = 0;
                                    break;
                                }
                                arr[c][j] = arr[c - 1][j];
                            }
                        }
                    }
                }
                break;
            //    右
            case 39:
                for (let i = 0; i < 4; i++) {
                    for (let j = 3; j >= 0; j--) {
                        let k = j;
                        while (!arr[i][k]) {
                            k--;
                            if (k === -1) break;
                        }
                        if (k === -1) break;
                        if (k < j) {
                            canmove = true;
                            arr[i][j] = arr[i][k];
                            arr[i][k] = 0;
                        }
                    }
                    for (let j = 3; j >= 1; j--) {
                        if (arr[i][j] > 0 && arr[i][j] === arr[i][j - 1]) {
                            canmove = true;
                            break;
                        }
                    }
                }
                if (!canmove) {
                    return false;
                }
                for (let i = 0; i < 4; i++) {
                    for (let j = 3; j > 0; j--) {
                        if (arr[i][j] === arr[i][j - 1]) {
                            arr[i][j] <<= 1;
                            let
                                c = j;
                            while (arr[i][c]) {
                                c--;
                                if (c === 0) {
                                    arr[i][c] = 0;
                                    break;
                                }
                                arr[i][c] = arr[i][c - 1];
                            }
                        }
                    }
                }
                break;
            //    左
            case 37:
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        let k = j;
                        while (!arr[i][k]) {
                            k++;
                            if (k === 4) break;
                        }
                        if (k === 4) break;
                        if (k > j) {
                            canmove = true;
                            arr[i][j] = arr[i][k];
                            arr[i][k] = 0;
                        }
                    }
                    for (let j = 0; j < 3; j++) {
                        if (arr[i][j] > 0 && arr[i][j] === arr[i][j + 1]) {
                            canmove = true;
                            break;
                        }
                    }
                }
                if (!canmove) {
                    return false;
                }
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (arr[i][j] === arr[i][j + 1]) {
                            arr[i][j] <<= 1;
                            let c = j;
                            while (arr[i][c]) {
                                c++;
                                if (c === 3) {
                                    arr[i][c] = 0;
                                    break;
                                }
                                arr[i][c] = arr[i][c + 1];
                            }
                        }
                    }
                }
                break;
            default:
                //其他键位
                return false;
        }
        let addResult = this.newNumber();
        if (addResult === 0 && this.isDie()) {
            let state = Object.assign({}, this.state);
            state.message = '游戏结束，点击重新开始';
            this.setState(state);
            return;
        }
        if (this.isWin()) {
            let state = Object.assign({}, this.state);
            state.message = '恭喜过关，点击重玩';
            this.setState(state);
        }
    }

    isWin() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.state.array[i][j] === 2048)
                    return true;
            }
        }
        return false;
    }

    isDie() {
        //满了，四个方向上还有可以合并的吗
        let arr = this.state.array;
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 3; i++) {
                if (arr[i][j] > 0 && arr[i][j] === arr[i + 1][j]) {
                    return false;
                }
            }
            for (let i = 3; i >= 1; i--) {
                if (arr[i][j] > 0 && arr[i][j] === arr[i - 1][j]) {
                    return false;
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 1; j--) {
                if (arr[i][j] > 0 && arr[i][j] === arr[i][j - 1]) {
                    return false;
                }
            }
            for (let j = 0; j < 3; j++) {
                if (arr[i][j] > 0 && arr[i][j] === arr[i][j + 1]) {
                    return false;
                }
            }
        }
        //无法移动
        return true;
    }

    newGame() {
        let state = {array: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], message: ''};
        this.setState(state);
        setTimeout(()=>{
            this.newNumber();
            this.newNumber();
        },0);
    }
}

export default App;
