import cs_img from "./game-img/Counter-Strike_background.png"
import cod_img from "./game-img/Call_of_Duty_background.jpg"
import overwatch_img from "./game-img/Overwatch_background2.png"
import dayZ_img from "./game-img/dayz_background.jpeg"
import valorant_img from "./game-img/valorant_background2.png"
import destiny_img from "./game-img/Destiny_background2.jpg"
import rb6_img from "./game-img/RB6_background.png"
import lol_img from "./game-img/LoL_background.png"

    
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
        activities: ["Ranked", "Unranked", "ARAM"],
        url: lol_img
    }
] 

export default allGames