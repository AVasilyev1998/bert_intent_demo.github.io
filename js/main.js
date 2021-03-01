const uploadJSONInput = document.getElementById('upload-json');
    const uploadWeightsInput = document.getElementById('upload-weights');
    const loadModelBtn = document.getElementById('loadModel');
    const predictWithModel = document.getElementById('predictModel');
    const textInput = document.getElementById('textToClassificate');
    const classesArray = ['PlayMusic', 'AddToPlaylist', 'RateBook', 'SearchScreeningEvent', 'BookRestaurant', 'GetWeather', 'SearchCreativeWork']
    const classPredictionLAbel = document.getElementById('result');

    const classesDescr = document.getElementById('classes');
    classesDescr.textContent = '*Existing classes:' + classesArray;
    document.getElementById("loading").style.display = 'none';


    let tokenizer = new Tokenizer();
    
    loadModelBtn.onclick = function(){
        document.getElementById("loading").style.display = 'block';

        if(textInput.value === ''){
            console.log('Команда не введена');
        }else{

            getVocab();
            const modelUrl = 'https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/AVasilyev1998/bert_intent_demo.github.io/main/model/model.json' 
            // const modelUrl = 'http://localhost:8080/model.json';
            const model = tf.loadGraphModel(modelUrl).then(model => {
            // console.log('Model loaded successfully');
            document.getElementById("loading").style.display = 'none';
            const zeros = tf.tensor2d([tokens], [1, 38] , 'int32');
            let result = model.predict(zeros);
            console.log('weights: '+result.arraySync()[0]);
            // console.log('class: '+classesArray[getIdOfMaxElem(result.arraySync()[0])]);
            classPredictionLAbel.innerHTML = 'Class: '+classesArray[getIdOfMaxElem(result.arraySync()[0])];
            })

        }
    };

    
    function getIdOfMaxElem(arr){
        let index = 0
        let max = -1;
        for(let i=0;i < arr.length; i++){
            if(arr[i] > max){
                max = arr[i]
                index = i;
            }
        }
        return index
    }

    


    function getVocab(){
        fetch('https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/AVasilyev1998/bert_intent_demo.github.io/main/model/vocab.json')
        // fetch('http:localhost:8080/vocab.json')
            .then(res => res.json()) // Gets the response and returns it as a blob
            .then(json => {
                let obj = json;
                // console.log('vocab loaded');
                let tokenizer = new Tokenizer(obj, 38, true);
                // console.log(tokenizer);
                let text = textInput.value;
                let textArray = text.split(' ');
                // console.log(textArray);
                tokens = tokenizer.convert_tokens_to_ids(textArray);
                // console.log('play token'+tokenizer.convert_tokens_to_ids(['play']));
                // console.log('tokens:'+tokens);
                tokens = tokenizer.addMasks(tokens);
                // console.log('tokens:'+tokens);
                tokens = tokenizer.pad(tokens);
                // console.log('tokens:'+tokens);
            }
            );
        }

    