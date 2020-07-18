class text_to_speech{
 
    static convert(text) {
        let msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
    }

}