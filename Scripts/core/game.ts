//IIFE - Immediately Invoked Function Expression
(function()
{
    let stage:createjs.Stage;
    let canvas:any;
    let assetManager:createjs.LoadQueue;  
   
    //Load Assets
    let assetManifest =[
        {id: "player", src:"../../Assets/images/player_test.png"},
        {id: "enemy", src:"../../Assets/images/zombie_test.png"},
        {id: "bg", src:"../../Assets/images/background_test.png"}
    ];  
    let currentScene: objects.Scene;
    let currentState = 0;

    function Init()
    {
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.on("complete", Start);
        assetManager.loadManifest (assetManifest);
    }

    function Start()
    {
        //Get canvas from index.html
        canvas = document.getElementById("canvas");
        //Placing canvas into stage
        stage = new createjs.Stage(canvas);
        //Enable mouse movement within stage
        stage.enableMouseOver(20);
        //Update function
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        Main();
        
    }
     
    function Update()
    {   
        let newState = currentScene.Update();
        if(newState != currentState)
        {
            currentState = newState;
            Main();
        }
        stage.update(); 
    }

    function Main()
    {    
        stage.removeAllChildren();

        switch (currentState)
        {
            //Add start scene to the stage
            case config.START:
            currentScene = new scenes.Start(assetManager, currentState);
            break;     
        }   
        stage.addChild(currentScene);
    }
    window.onload = Init;

})();