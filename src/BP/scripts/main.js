import { system, world } from "@minecraft/server";
import letters from "./letters";
import { Game } from "./game";

const Games = new Map()

world.afterEvents.worldLoad.subscribe(()=>{

    
    world.beforeEvents.chatSend.subscribe((event)=>{
        if (event.message.toLowerCase() == "!wordle"){
            event.cancel = true
            if (Games.get(event.sender.id).end){
                Games.delete(event.sender.id)
            }
            if (Games.has(event.sender.id)){
                event.sender.sendMessage("§a[§rWordle§a]§r§c You are already in a game of worldle")
                return
            }else{
                Games.set(event.sender.id,new Game(event.sender))
            }
        }
        if (event.message.toLocaleLowerCase().startsWith("!guess")){
            event.cancel = true
            if (!Games.has(event.sender.id)) return event.sender.sendMessage("§a[§rWordle§a]§r§c You are not in a game of worldle\n§rplease use §e!wordle§r to start a new game")
            let guess = event.message.split(" ")[1]
            system.run(()=>{
                Games.get(event.sender.id).guess(guess)
            })
            if (Games.get(event.sender.id).end){
                Games.delete(event.sender.id)
            }
        }
    })
    
})

