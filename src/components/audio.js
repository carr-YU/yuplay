import React,{useEffect,useRef,useState} from 'react';
import '../../assets/css/audio.scss';
import axios from '../../assets/utils/axiosErrorHandler';
import {url, staticUrl} from '../../assets/utils/axiosUrl';
import {musicList} from '../../assets/utils/musicList';
let timer = null;

function AudioComponent(){
    const [txt,setTxt] = useState(null);
    const [lyricTimeArr,setLyricTimeArr] = useState(null);
    const [isPlaying,setIsPlaying] = useState(null);
    const [indexArray,setIndexArray] = useState([]);
    const [musicIndex,setMusicIndex] = useState(0);
    const [processWidth,setProcessWidth] = useState(0);
    const [allTime,setAllTime] = useState(0);
    const [currentTime,setCurrentTime] = useState(0);
    const [textTop,setTextTop] = useState(13)
    const audio = useRef(null);
    const lyric = useRef(null);
    useEffect(() => {
        axios({
            url:`${url}/txt/${musicList[musicIndex]}.txt`,
            // url:`${staticUrl}/txt/${musicList[musicIndex]}.txt`,
            method:'get',
        })
        .then((response)=>{
            if(!!response.data){
                let txt = dealLyric(response.data,setLyricTimeArr);
                txt = {__html:txt}
                setTxt(txt);
            }
        })
    },[musicIndex])

    useEffect(() => {
        setTimeout(play,500);
    },[lyricTimeArr])

    //播放
    function play(){
        let allArr = lyric.current.children;
        let eleArr = [];
        for(let i=0; i<allArr.length; i++){
            if(allArr[i].className.indexOf('lyric')>-1){
                eleArr.push(allArr[i])
            }
        }
        setIsPlaying(!isPlaying)
        if(isPlaying != null){
            audio.current.play();
        }
        setAllTime(audio.current.duration);
        const totalTime = audio.current.duration
        const totalWidth = lyric.current.offsetWidth;
        let moveWidth = processWidth;
        let count = 1;
        let timeIndex = -1;
        clearInterval(timer);
        timer = setInterval(function(){
            for(let i=0 ;i<lyricTimeArr.length; i++){
                let time = audio.current.currentTime;
                if(time>lyricTimeArr[i] && i>timeIndex){
                    if(timeIndex == -1){
                        //  将标题和歌手置为白色
                        document.getElementsByClassName("sing-name")[0].style.color = "#878787";
                        document.getElementsByClassName("singer")[0].style.color = "#878787";
                    }
                    if(indexArray.indexOf(i)>=0){
                        continue;
                    }
                    setIndexArray(indexArray =>{
                        indexArray.push(i)
                        return indexArray;
                    });
                    timeIndex = i;
                    eleArr[i].style.color = "#fff";
                    setTextTop(lyric.current.offsetTop-22)
                    if(i!=0){
                        eleArr[i-1].style.color = "#878787";
                    }
                    if(eleArr[i+1]){
                        eleArr[i+1].style.color = "#878787";
                    }
                    i++;
                }
            }
            moveWidth += totalWidth/(totalTime*2);
            if(moveWidth<totalWidth){
                setProcessWidth(moveWidth);
            }else{
                next();
            }
            if(count%2 == 0){
                setCurrentTime(audio.current.currentTime);
            }
            count++;

        },500)
    }
    //暂停
    function stop(){
        setIsPlaying(!isPlaying)
        clearInterval(timer);
        audio.current.pause();
    }
    //下一首
    function next(){
        if(musicIndex==musicList.length-1){
            return;
        }
        setMusicIndex(musicIndex+1);
        resetLyric()
    }
    //上一首
    function prev(){
        if(musicIndex==0){
            return;
        }
        setMusicIndex(musicIndex-1);
        resetLyric()
    }
    //重置歌词显示
    function resetLyric(){
        setTextTop(13)
        document.getElementsByClassName("sing-name")[0].style.color = "#fff";
        document.getElementsByClassName("singer")[0].style.color = "#fff";
        setIndexArray([])
        audio.current.currentTime = 0;
        setIsPlaying(false);
        setCurrentTime(0);
        setProcessWidth(0);
    }
    return (
        <div className="audio-div">
            <audio ref={audio} style={{display:"none"}} autoPlay={true} className="sh" controls="controls" src={`${staticUrl}/files/${musicList[musicIndex]}.mp3`}></audio>
            <div className="audio-text" ref={lyric} style={{top:textTop}} dangerouslySetInnerHTML={txt}></div>
            <div className="process-bar" style={{width:processWidth}}></div>
            <div className="control-pane">
                <div className="prev-btn" onClick={()=>prev()}>
                <svg t="1598406417051" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2789" width="30" height="30"><path d="M842.666667 864c-8.533333 0-14.933333-2.133333-21.333334-8.533333l-341.333333-309.333334c-6.4-6.4-10.666667-14.933333-10.666667-23.466666 0-8.533333 4.266667-17.066667 10.666667-23.466667l341.333333-309.333333c12.8-12.8 34.133333-10.666667 44.8 2.133333 12.8 12.8 10.666667 34.133333-2.133333 44.8L548.266667 522.666667l315.733333 285.866666c12.8 10.666667 14.933333 32 2.133333 44.8-6.4 6.4-14.933333 10.666667-23.466666 10.666667z" p-id="2790" fill="#ffffff"></path><path d="M512 864c-8.533333 0-14.933333-2.133333-21.333333-8.533333L149.333333 546.133333c-6.4-6.4-10.666667-14.933333-10.666666-23.466666 0-8.533333 4.266667-17.066667 10.666666-23.466667L490.666667 189.866667c12.8-12.8 34.133333-10.666667 44.8 2.133333 12.8 12.8 10.666667 34.133333-2.133334 44.8L217.6 522.666667 533.333333 808.533333c12.8 12.8 14.933333 32 2.133334 44.8-6.4 6.4-14.933333 10.666667-23.466667 10.666667z" p-id="2791" fill="#ffffff"></path></svg>
                </div>
                <div className="play-btn">{
                    isPlaying?
                    <svg t="1598406792590" onClick={()=>stop()} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3808" width="40" height="40"><path d="M512 800c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z m96-256a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V432a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16v160z m-144 0a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V432a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16v160z" p-id="3809" fill="#ffffff"></path></svg>
                    :
                    <svg t="1598406764871" onClick={()=>play()} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3615" width="40" height="40"><path d="M512 800c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z m-23.712-394.432v117.408l96.608-58.704-96.608-58.704z m0.608 173.2a32 32 0 0 1-48.608-27.36V425.152a32 32 0 0 1 48.608-27.36l143.44 87.152a32 32 0 0 1 0 54.704l-143.44 87.136z" p-id="3616" fill="#ffffff"></path></svg>
                }
                </div>
                <div className="next-btn" onClick={()=>next()}>
                <svg t="1598406470861" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2991" width="30" height="30"><path d="M544 522.666667c0-8.533333-4.266667-17.066667-10.666667-23.466667L192 189.866667c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733334 285.866667L149.333333 808.533333c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466667 10.666667 8.533333 0 14.933333-2.133333 21.333333-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666z" p-id="2992" fill="#ffffff"></path><path d="M864 499.2l-341.333333-309.333333c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733333 285.866667-315.733333 285.866666c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466666 10.666667 8.533333 0 14.933333-2.133333 21.333334-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666 0-8.533333-4.266667-17.066667-10.666667-23.466667z" p-id="2993" fill="#ffffff"></path></svg>
                </div>
            </div>
            <div className="time-list">{dealTime(currentTime)}/{dealTime(allTime)}</div>
        </div>
        )
}
//处理时间
function dealTime(time){
    time = parseInt(time);
    const second = time%60>=10?time%60:'0'+time%60;
    const minute = parseInt(time/60)>=10?parseInt(time/60):'0'+parseInt(time/60);
    return `${minute}:${second}`;
}

//处理获取来的歌词
function dealLyric(txt,setLyricTimeArr){
    let lyricArr = txt.match(/\[([^\[\]]*)+?\]/g)
    setLyricTimeArr(dealTimeOfLyic(lyricArr));
    txt = txt.replace(/\[([^\[\]]*)+?\]/g,"<br/>")
    let txtArr = txt.split("<br/>")
    txt = "";
    txtArr.map((item,index)=>{
        //歌名+歌手
        if(index == 0){
            let itemArr = item.split("-")
            txt += `<div class="sing-name">${itemArr[0]}<span class="singer"> -- ${itemArr[1]}</span></div>`
        }else{
            txt += `<div class="${["lyric",index].join(" ")}" time="${lyricArr[index-1]}">${item}</div>`
        }
        
    })
    return txt;
}
//处理歌词的前面的时间，转成以秒为单位
function dealTimeOfLyic(timeArr){
    let res = []
    timeArr.map(item=>{
        let arr = item.match(/\[([^\[\]]*)+?\]/);
        let content = arr[1];
        let contentArr = content.split(":")
        let time = parseInt(contentArr[0])*60+parseFloat(contentArr[1])
        res.push(time);
    })
    
    return res;

}


export default AudioComponent;