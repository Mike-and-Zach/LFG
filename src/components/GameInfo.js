import cs_img from "./game-img/CS_Background.jpeg"
import cod_img from "./game-img/Call_of_Duty_background.jpg"
import overwatch_img from "./game-img/Overwatch_background.jpeg"
import dayZ_img from "./game-img/dayz_background.jpeg"
import valorant_img from "./game-img/Valorant_background.jpeg"
import destiny_img from "./game-img/Destiny_background.jpeg"
import rb6_img from "./game-img/RB6_background.png"
import lol_img from "./game-img/LoL_background.jpeg"

    
    const allGames = [
    {
        title: "Call of Duty",
        activities: ["Warzone", "DMZ", "Multiplayer", "Spec Ops", "Co op"],
        url: cod_img
    },
    {
        title: "Overwatch 2",
        activities: ["Ranked", "Unranked", "Arcade", "Custom Games"],
        url: overwatch_img
    },
    {
        title: "DayZ",
        activities: ["Role Playing", "PvP", "PvE", "Survival", "Vanilla", "Modded"],
        url: dayZ_img
    },
    {
        title: "Counter-Strike 2",
        activities: ["Faceit", "Match Making", "Community", "Danger Zone"],
        url: cs_img
    },
    {
        title:  "Valorant",
        activities: ["Rated", "Unrated", "Spike Rush", "Swift Play"],
        url: valorant_img
    },
    {
        title: "Destiny",
        activities: ["Raids", "Crucibal"],
        url: destiny_img
    },
    {
        title: "Rainbow Six Siege",
        activities: ["Ranked", "Unranked", "Casual"],
        url: rb6_img
    },
    {
        title: "League of Legends",
        activities: ["Ranked", "Unranked", "TFT"],
        url: lol_img
    }
] 

export default allGames