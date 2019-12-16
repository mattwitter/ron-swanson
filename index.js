const Alexa = require('ask-sdk');
const skillBuilder = Alexa.SkillBuilders.custom();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
    },
    handle(handlerInput) {
        const openerAudio = '<audio src="https://swansonquotes.s3.amazonaws.com/Ron+Swanson+Opener+16k.mp3" />'
        const randomAudio = '<audio src="https://swansonquotes.s3.amazonaws.com/Quote+' + getRandomInt(0, 8) + '+22k.mp3" />'
        const reprompt = 'Would you like a quote from Ron Swanson?'
        return handlerInput.responseBuilder
            .speak(`<break strength='strong' />${openerAudio}<break strength='strong' /> ${reprompt}`)
            .reprompt('Would you like a quote from Ron Swanson?')
            .withShouldEndSession(false)
            .getResponse()
    },
}

const NoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
    },
    handle(handlerInput) {
        const closerAudio = '<audio src="https://swansonquotes.s3.amazonaws.com/Ron+Swanson+Closer.mp3" />'
        const goodbye = 'Goodbye'
        return handlerInput.responseBuilder
            .speak(`<break strength='strong' />${closerAudio}<break strength='strong' /> ${goodbye}`)
            .withShouldEndSession(true)
            .getResponse()
    },
}


const YesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
    },
    async handle(handlerInput) {
        const randomAudio = '<audio src="https://swansonquotes.s3.amazonaws.com/Quote+' + getRandomInt(0, 8) + '+22k.mp3" />'
        const reprompt = 'Would you like another quote?'
        return handlerInput.responseBuilder
            .speak(`<break strength='strong' />${randomAudio}<break strength='strong' /> ${reprompt}`)
            .reprompt(reprompt)
            .withShouldEndSession(false)
            .getResponse()
    },
}


const QuoteIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'QuoteIntent'
    },
    async handle(handlerInput) {
        const randomAudio = '<audio src="https://swansonquotes.s3.amazonaws.com/Quote+' + getRandomInt(0, 8) + '+22k.mp3" />'
        const reprompt = 'Would you like another quote?'
        return handlerInput.responseBuilder
            .speak(`<break strength='strong' />${randomAudio}<break strength='strong' /> ${reprompt}`)
            .reprompt(reprompt)
            .withShouldEndSession(false)
            .getResponse();
    }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("Ron Swanson Quotes is your source for all things Swanson. You can say 'Quote Ron' to hear his wisdom.")
            .reprompt("Ron Swanson Quotes is your source for all things Swanson. You can say 'Quote Ron' to hear his wisdom.")
            .withShouldEndSession(false)
            .getResponse()
    },
}

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent'
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("I'm sorry, I'm not sure what that is. Do you want a Ron Swanson Quote?")
            .reprompt("Would you like a quote from Ron Swanson?")
            .withShouldEndSession(false)
            .getResponse()
    }
}

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Goodbye!')
            .withShouldEndSession(true)
            .getResponse()
    },
}

const ErrorHandler = {
    canHandle() {
        return true
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("I'm sorry I didn't catch that. Can you repeat that?")
            .reprompt("I'm sorry I didn't catch that. Can you repeat that?")
            .withShouldEndSession(false)
            .getResponse()
    },
}

const builder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        QuoteIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        YesIntentHandler,
        NoIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
