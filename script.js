const from = document.querySelector('#messageForm');
const output = document.querySelector('#output');

const messages =[];

const htmlEncode = (dirty) => {
    const clean = DOMPurify.sanitize(dirty,{ALLOWED_TAGS: ['b', 'i']});
    return clean
  }

const createMessageElement = message => {

    const encodedBody = htmlEncode(message.body);

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    const messageHeader = document.createElement('header');
    messageHeader.classList.add('message-header');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    const img = document.createElement ('img');
    img.setAttribute('src', message.imageUrl);

    const headline = document.createElement('h2');
    headline.innerText = message.headline;

    const messageBody = document.createElement('div');
    messageBody.classList.add('message-body');
    messageBody.innerHTML= encodedBody;

    imgContainer.appendChild(img);
    messageHeader.appendChild(imgContainer);
    messageHeader.appendChild(headline);

    messageDiv.appendChild(messageHeader);
    messageDiv.appendChild(messageBody);

    return messageDiv;
}

const renderMessage = (message) => {
    output.appendChild(createMessageElement(message));
}

const renderMessages = () => {
    output.innerHTML = ''
    for(const message of messages) {
        output.appendChild(createMessageElement(message));
    }
}


const submitHandler = (e) => {
    e.preventDefault();

    const headerlineInput = e.target.querySelector('#messageHeadline');
    const messageBodyInput = e.target.querySelector('#messageBody');
    const imageInput = e.target.querySelector('#messageImage');

    const headline = headerlineInput.value;
    const body = messageBodyInput.value;
    const imageUrl = imageInput.value;

   if(
        !headline || 
        !body || 
        !imageUrl || 
        headline.trim().length === 0 || 
        body.trim().length === 0 || 
        imageUrl.trim().length === 0
    ) {
        e.target.querySelector('#errorM').classList.remove('displayNope');
        return
   }

   e.target.querySelector('#errorM').classList.add('displayNope');

   const message = {
    headline,
    body,
    imageUrl
   }
   messages.push(message);
   console.log(messages);
   e.target.reset();
   renderMessage(message);
}


from.addEventListener('submit', submitHandler);