document.addEventListener("DOMContentLoaded",()=>{

  // Smooth scroll nav
  document.querySelectorAll('nav a[href^="#"]').forEach(link=>{
    link.addEventListener("click",e=>{
      e.preventDefault();
      const target=document.querySelector(link.getAttribute("href"));
      if(target){window.scrollTo({top:target.offsetTop-60,behavior:"smooth"});}
      setActive(link);
    });
  });
  const sections=document.querySelectorAll("section");
  window.addEventListener("scroll",()=>{
    let current="";
    sections.forEach(sec=>{
      const offset=sec.offsetTop-200;
      if(pageYOffset>=offset) current=sec.getAttribute("id");
    });
    document.querySelectorAll("nav a").forEach(a=>{
      a.classList.remove("active");
      if(a.getAttribute("href")==="#"+current) a.classList.add("active");
    });
  });
  function setActive(el){
    document.querySelectorAll("nav a").forEach(a=>a.classList.remove("active"));
    el.classList.add("active");
  }

  // Home description rewrite style
  const homeDescEl=document.getElementById("home-description");
  const descriptions=["Full Stack Developer & Creative Designer","Frontend & Backend Specialist","UI/UX Enthusiast","Building Beautiful Web Experiences"];
  let idx=0;
  setInterval(()=>{
    homeDescEl.style.opacity=0;
    setTimeout(()=>{
      idx=(idx+1)%descriptions.length;
      homeDescEl.textContent=descriptions[idx];
      homeDescEl.style.opacity=1;
    },350);
  },4000);

  // Glow function
  function addGlow(el){el.classList.add("glow-click"); setTimeout(()=>el.classList.remove("glow-click"),400);}

  // Frame clicks
  document.querySelectorAll(".frame").forEach(f=>f.addEventListener("click",()=>{addGlow(f);}));

  // Hero buttons
  document.getElementById("download-cv").addEventListener("click",()=>{addGlow(event.target);});
  document.getElementById("contact-btn").addEventListener("click",()=>{addGlow(event.target);});

  // Social buttons
  document.getElementById("facebook").addEventListener("click",()=>{window.open("https://facebook.com","_blank"); addGlow(event.target);});
  document.getElementById("tiktok").addEventListener("click",()=>{window.open("https://tiktok.com","_blank"); addGlow(event.target);});
  document.getElementById("instagram").addEventListener("click",()=>{window.open("https://instagram.com","_blank"); addGlow(event.target);});

  // Tools in Services hidden behind button
  const showToolsBtn=document.getElementById("show-tools-btn");
  const toolsContainer=document.getElementById("tools-container");
  const tools=["Figma","Deepseek","Canva","Capcut","React","Next.js","Node.js","PPT","ChatGPT","Blackbox","Javascript"];
  let visible=false;
  showToolsBtn.addEventListener("click",()=>{
    if(visible){toolsContainer.innerHTML=""; visible=false; return;}
    toolsContainer.innerHTML="";
    tools.forEach((t,i)=>{
      const div=document.createElement("div");
      div.classList.add("frame");
      div.textContent=t;
      div.addEventListener("click",()=>addGlow(div));
      toolsContainer.appendChild(div);
    });
    visible=true;
  });

  // Full screen sections adjust
  function adjustSectionsHeight(){
    document.querySelectorAll("section").forEach(sec=>sec.style.minHeight=window.innerHeight+"px");
  }
  window.addEventListener("resize",adjustSectionsHeight);
  window.addEventListener("load",adjustSectionsHeight);

});