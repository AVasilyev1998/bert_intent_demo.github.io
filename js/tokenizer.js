const vocab = {}

class Tokenizer{
    constructor(vocab_file, max_seq_len=38, do_lowercase=true){
        this.vocab = vocab_file;
        this.max_seq_len = max_seq_len;
        this.do_lowercase = do_lowercase;
        // https://github.com/google-research/bert/blob/master/tokenization.py
        // source of original tokenizer
    }
  
    convert_tokens_to_ids(arr){
        let tmp_arr = new Array();
        for(let item in arr){
            if (this.vocab.hasOwnProperty(arr[item])){
                tmp_arr.push(this.vocab[arr[item]]);
            }else{
                tmp_arr.push(0);  // TODO: change if needed
            };
        };
        return tmp_arr;
    }

    addMasks(arr){
        let tmp_arr = ["[CLS]"];
        for(let item in arr){
            tmp_arr.push(arr[item]);
        }
        tmp_arr.push("[SEP]");

        return tmp_arr;
    }

    pad(arr){
        for(let i=arr.length; i<this.max_seq_len; i++){
            arr.push(0);
        }
        return arr;
    }

    get_vocab(){
        return this.vocab;
    }

}