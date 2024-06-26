import React, {useState, useEffect, useRef} from 'react'
// import 
import "./champion-picker.css"

const filenames = [
"plus_sign","Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","AurelionSol","Azir","Bard","Belveth","Blitzcrank","Brand","Braum","Briar","Caitlyn","Camille","Cassiopeia","Chogath","Corki","Darius","Diana","Draven","DrMundo","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Hwei","Illaoi","Irelia","Ivern","Janna","JarvanIV","Jax","Jayce","Jhin","Jinx","Kaisa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Khazix","Kindred","Kled","KogMaw","KSante","Leblanc","LeeSin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Malphite","Malzahar","Maokai","MasterYi","Milio","MissFortune","MonkeyKing","Mordekaiser","Morgana","Naafiri","Nami","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","Nunu","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","RekSai","Rell","Renata","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Seraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Smolder","Sona","Soraka","Swain","Sylas","Syndra","TahmKench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","TwistedFate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Velkoz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","Xayah","Xerath","XinZhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoe","Zyra"
]

function ChampionPicker({champ, setChamps, id, blue_team}) {
  let style = blue_team ? "blue-style" : "red-style"
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const [showDropdown, setShowDropdown] = useState(false)
  const [champName, setChampName] = useState("")

  function handleType(text) {
    setChampName(text)
  }


  function selectImage(file) {
    setChamps(id, file)
    setShowDropdown(false)
  }

  function selectMain() {
    // setImage(file)
    setShowDropdown(true)
  }

  function getLastUpperIndex(s) {
    var ind = 0
    for(let i = 0; i < s.length; i++) {
      if(s[i] === s[i].toUpperCase()) {
        ind = i
      }
    }
    return ind
  }

  
  function formatName(s){
    if(s === 'plus_sign')
      return ""
    if(s === "MonkeyKing")
      return "Wukong"
    let lastInd = getLastUpperIndex(s)
    if(lastInd > 0)
      return s.substring(0, lastInd) + " " + s.substring(lastInd, s.length)
    return s
  }

  function filterFileFunc(f) {
    if(f === 'plus_sign')
      f = ''
    if(f === "MonkeyKing")
      f = "Wukong"
    let lastInd = getLastUpperIndex(f)
      if(lastInd > 0)
        f = f.substring(0, lastInd) + " " + f.substring(lastInd, f.length)
    return f.toUpperCase().startsWith(champName.toUpperCase())
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDropdown(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  // console.log(filenames)
  
  return ( 
    <div ref={wrapperRef} className={`champion-border-module ${style} ${showDropdown && "module-aspect-ratio"} ${isSafari ? "safari-container":  ""}`}>
      <div className={`champion_picker_container ${showDropdown ? "overflow-scroll" : "overflow-hidden"}`}>
        {!showDropdown ? <img onClick={() => selectMain()} src={`/images/loading/${champ}_0.png`} alt={`${champ}`}/> :
          <div className='champion_choose'>
            <input autoFocus value={champName} onChange={(e) => handleType(e.target.value)} className='champion-input' placeholder="Enter Champion" type="text"/>
          {filenames.filter(filterFileFunc).map((f, index) => 
          <div key ={index} className={`champion-icon-container champs-icon-width ${f === champ && f !== "plus_sign" ? "champion-icon-container-selected" : ""}`}>
            <div className={` ${f === "plus_sign" ? "plus-sign-div" : "champion_icon_div" }'`} >
              <img onClick={() => selectImage(f)} src={`/images/champion/${f}.png`} alt={`${f}`}/>
            </div>
            <span className='champion-name-text champion-name-text-size'>{formatName(f)}</span>
          </div>
          )}
          </div>}
      </div>
    </div>
  )
}

export default ChampionPicker