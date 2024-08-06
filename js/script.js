const dino = document.querySelector(".dino");
const background = document.querySelector(".background")
let isJumping = false
let position = 0;

function handleKeyUp(e) {
  if (e.keyCode === 32 || e.keyCode === 38) {
    if (!isJumping) {
        jump();
    }else if (e.keyCode === 40) { 
      if (!isCrouching) {
        isCrouching = true;
        dino.classList.add("dino-crouching"); 
      } else {
        isCrouching = false;
        dino.classList.remove("dino-crouching");
      }
    }
  }
}  
  function jump() {
    isJumping = true;
  
    let upInterval = setInterval(() => {
      if (position >= 150) {
        clearInterval(upInterval);
  
        let downInterval = setInterval(() => {
          if (position <= 0) {
              clearInterval(downInterval);
              isJumping = false
          }else{
              position -= 20;
              dino.style.bottom = position   
   + "px";
          }
        }, 20);
      } else {
        position += 20;
        dino.style.bottom = position + "px";
      }
    }, 20);
  }
  
  function createCactus(){
      const cactus = document.createElement('div')
      let cactusPosition = 1000
      let randomTime = Math.random() * 6000   
  
      
      cactus.classList.add('cactus')
      cactus.style.left = 1000 + 'px'
      background.appendChild(cactus)
  
      let leftInterval = setInterval(() => {
          
          if(cactusPosition < -60){
              clearInterval(leftInterval)
              background.removeChild(cactus)   
  
          }else if(cactusPosition > 0 && cactusPosition < 60 && (position   
   < 60 || isCrouching)){
              clearInterval(leftInterval)
              document.body.innerHTML = '<h1 class="game-over">Fim do Jogo</h1>'
          }else{
              cactusPosition -= 10
              cactus.style.left = cactusPosition   
   + 'px'
              score++;
          }
      }, 20);
  
      setTimeout(createCactus, randomTime)
  }
  
  // TODO: Implementar a logica para exibir o placar na tela
  
  createCactus()
  
  document.addEventListener("keyup", handleKeyUp);