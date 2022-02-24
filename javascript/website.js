// Blockchain
const Blockchain = function() {
    this.chain = [];
    this.newTransactions = [];
    this.createNewBlock(100, '0', '0');
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.newTransactions,
        nonce: nonce,
        previousBlockHash: previousBlockHash,
        hash: hash
    };

    this.newTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    };

    this.newTransactions.push(newTransaction);
    return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = md5(dataAsString);
    return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while(hash.substring(0, 4) !== '0000') {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }

    return nonce;
}

const bitcoin = new Blockchai	n();

// variables
const powerOff = document.querySelector('#power-off');
const accountName = document.querySelector('#account-name');
const loginForm = document.querySelector('#login-form');
const form = document.querySelector('#form');
const name = document.querySelector('#name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const rePassword = document.querySelector('#re-password');
const openAccount = document.querySelector('#open-login-form');
const accountAmount = document.querySelector('#account-amount');
const information = document.querySelector('#information');
const buy = document.querySelector('#buy');
const home = document.querySelector('#home');
const btnAmazon = document.querySelector('#btn-amazon');
const amazon = document.querySelector('#amazon');
const slider = document.querySelector('#slider');
const company = document.querySelector('#company');
const body = document.querySelector('#bdy');
const btnApple = document.querySelector('#btn-apple');
const apple = document.querySelector('#apple');
const btnAt = document.querySelector('#btn-at');
const at = document.querySelector('#at');
const btnDigikala = document.querySelector('#btn-digikala');
const digikala = document.querySelector('#digikala');
const btnFacebook = document.querySelector('#btn-facebook');
const facebook = document.querySelector('#facebook');
const btnGoogle = document.querySelector('#btn-google');
const google = document.querySelector('#google');
const btnNetflix = document.querySelector('#btn-netflix');
const netflix = document.querySelector('#netflix');
const btnSamsung = document.querySelector('#btn-samsung');
const samsung = document.querySelector('#samsung');
const btnSnapp = document.querySelector('#btn-snapp');
const snapp = document.querySelector('#snapp');
const blankInputsMessage = document.querySelector('#blank-inputs');
const lengthOfPasswordMessage = document.querySelector('#length-of-password');
const comparePasswordsMessage = document.querySelector('#compare-passwords');
const trueLoginMessage = document.querySelector('#true-login');
const logOffMessage = document.querySelector('#log-off-message');
const logOffYesSubmit = document.querySelector('#log-off-yes-submit');
const logOffNoSubmit = document.querySelector('#log-off-no-submit');
const profile1 = document.querySelector('#profile-1');
const transactionInfo = document.querySelector('#transaction-info');
const profileName = document.querySelector('#profile-1-name');
const accountCharge = document.querySelector('#account-charge');
const chargingAccountBox = document.querySelector('#charging-account');
const navbar = document.querySelector('#navbar');
const accountChargeIcon = document.querySelector('#account-charging-close-icon');
const accountChargeSubmit = document.querySelector('#charging-account-submit');
const accountChargeNumber = document.querySelector('#charging-account-number');
const chargingAccountUser = document.querySelector('#charging-account-user');
const buySuccess = document.querySelector('#buy-success');
const buyFailed = document.querySelector('#buy-failed');
const buy2 = document.querySelector('#buy2');

let DB1;

// open login form with a condition
openAccount.addEventListener('click', () => {
  if(accountName.textContent == 'No Account') {
    loginForm.style.display = 'block';
  }else {
    loginForm.style.display = 'none';
  }
})

// create database for login form and buy equities
document.addEventListener('DOMContentLoaded', () => {
  information.style.color = '#ff2e63';

  // login form database
  const loginFormDatabase = window.indexedDB.open('loginFormDatabase', 1);
  loginFormDatabase.onerror = function() {
    console.log('The Login Form Database Has Error!');
  }
  loginFormDatabase.onsuccess = function() {
    console.log('The Login Form Database Is Ready!');
    DB1 = loginFormDatabase.result;
    insertAccountName();
  }
  loginFormDatabase.onupgradeneeded = function(e) {
    let db = e.target.result;
    let objectStore = db.createObjectStore('loginFormDatabase', { keyPath: 'key', autoIncrement: true } );
    objectStore.createIndex('name', 'name', { unique: false } );
    console.log('Database ready and fields created!');
  }
  form.addEventListener('submit', runLoginForm);
  function runLoginForm(e) {
    e.preventDefault();
    // validate login form
    if(name.value == '' || lastName.value == '' || email.value == '' || password.value == '' || rePassword.value == '') {
      blankInputsMessage.style.display = 'block';
      setTimeout(() => {
        blankInputsMessage.style.display = 'none';
      }, 5000)
      return false;
    }else if(password.value.length < 8) {
      lengthOfPasswordMessage.style.display = 'block';
      setTimeout(() => {
        lengthOfPasswordMessage.style.display = 'none';
      }, 5000)
      return false;
    }else if(password.value !== rePassword.value) {
      comparePasswordsMessage.style.display = 'block';
      setTimeout(() => {
        comparePasswordsMessage.style.display = 'none';
      }, 5000)
      return false;
    }else {
      trueLoginMessage.style.display = 'block';
      setTimeout(() => {
        trueLoginMessage.style.display = 'none';
      }, 5000)
    }
      let newAccountNames = {
        name : name.value
    }
    let transaction = DB1.transaction(['loginFormDatabase'], 'readwrite');
    let objectStore = transaction.objectStore('loginFormDatabase');
    let request = objectStore.add(newAccountNames);
    request.onsuccess = () => {
        form.reset();
    }
    transaction.oncomplete = () => {
        console.log('New Account Name added!');
        insertAccountName();
    }
    transaction.onerror = () => {
        console.log('There was an error, try again!');
    }
    // make blank inputs after submit
    name.value = '';
    lastName.value = '';
    email.value = '';
    password.value = '';
    rePassword.value = '';

    loginForm.style.display = 'none';
  }
  function insertAccountName() {
    while(accountName.firstChild && profileName.firstChild) {
          accountName.removeChild(accountName.firstChild);
          profileName.removeChild(profileName.firstChild);
    }

    let objectStore = DB1.transaction('loginFormDatabase').objectStore('loginFormDatabase');

    objectStore.openCursor().onsuccess = function(e) {
          let cursor = e.target.result;

          if(cursor) {
            accountName.innerHTML = cursor.value.name;
            profileName.innerHTML = cursor.value.name;
              cursor.continue();
            }
    }
  }
})

// open log off message
powerOff.addEventListener('click', () => {
  logOffMessage.style.display = 'block';
})

// log off message box (yes or no) !
logOffYesSubmit.addEventListener('click', () => {
  accountName.innerHTML = 'No Account';
  profileName.innerHTML = 'No Account';
  accountAmount.innerHTML = '0';
  logOffMessage.style.display = 'none';
  document.querySelector('#profile-1-img-default').src = '../img/profile-account.jpg';
})

logOffNoSubmit.addEventListener('click', () => {
  logOffMessage.style.display = 'none';
})

// open charging account box
accountCharge.addEventListener('click', () => {
  chargingAccountBox.style.display = 'block';
  transactionInfo.style.opacity = '0.2';
  profile1.style.opacity = '0.2';
})

// close charging account box
accountChargeIcon.addEventListener('click', () => {
  chargingAccountBox.style.display = 'none';
  transactionInfo.style.opacity = '1';
  profile1.style.opacity = '1';
})

// increase bitcoin
accountChargeSubmit.addEventListener('click', () => {
  let number = Math.round(Math.random() * 9999999);
  let user = parseInt(chargingAccountUser.value);
  if(accountChargeNumber.innerHTML == user) {
    accountAmount.innerHTML++;
    accountChargeNumber.innerHTML = number;
  }

  chargingAccountUser.value = '';
})



// click on information page
information.addEventListener('click', () => {
  slider.style.display = 'block';
  company.style.display = 'block';
  buy.style.color = 'black';
  home.style.color = 'black';
  information.style.color = '#ff2e63';
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });

  // add animation classes
  slider.classList.add('slideLeft');
  company.classList.add('slideLeft');

  // display : none for allow companies
  loginForm.style.display = 'none';
  amazon.style.display = 'none';
  apple.style.display = 'none';
  at.style.display = 'none';
  digikala.style.display = 'none';
  facebook.style.display = 'none';
  google.style.display = 'none';
  netflix.style.display = 'none';
  samsung.style.display = 'none';
  snapp.style.display = 'none';
  profile1.style.display = 'none';
  transactionInfo.style.display = 'none';
})

// display amazon box
btnAmazon.addEventListener('click', () => {
  amazon.style.display = 'block';
  slider.style.display = 'none';
  company.style.display = 'none';
  information.style.color = 'black';
  buy.style.color = '#ff2e63';
  body.style.background = '#eaeaea';
})

// display apple box
btnApple.addEventListener('click', () => {
  apple.style.display = 'block';
  slider.style.display = 'none';
  company.style.display = 'none';
  information.style.color = 'black';
  buy.style.color = '#ff2e63';
  body.style.background = '#eaeaea';
})

// display at&t box
btnAt.addEventListener('click', () => {
  at.style.display = 'block';
  slider.style.display = 'none';
  company.style.display = 'none';
  information.style.color = 'black';
  buy.style.color = '#ff2e63';
  body.style.background = '#eaeaea';
})

// display digikala box
btnDigikala.addEventListener('click', () => {
  digikala.style.display = 'block';
  slider.style.display = 'none';
  company.style.display = 'none';
  information.style.color = 'black';
  buy.style.color = '#ff2e63';
  body.style.background = '#eaeaea';
})

// display facebook box
btnFacebook.addEventListener('click', () => {
  facebook.style.display = 'block';
  slider.style.display = 'none';
  company.style.display = 'none';
  information.style.color = 'black';
  buy.style.color = '#ff2e63';
  body.style.background = '#eaeaea';
})

// display google box
btnGoogle.addEventListener('click', () => {
  google.style.display = 'block';
  slider.style.display = 'none';
  company.style.display = 'none';
  information.style.color = 'black';
  buy.style.color = '#ff2e63';
  body.style.background = '#eaeaea';
})

// display netflix box
btnNetflix.addEventListener('click', () => {
  netflix.style.display = 'block';
  slider.style.display = 'none';
  company.style.display = 'none';
  information.style.color = 'black';
  buy.style.color = '#ff2e63';
  body.style.background = '#eaeaea';
})

// display samsung box
btnSamsung.addEventListener('click', () => {
  samsung.style.display = 'block';
  slider.style.display = 'none';
  company.style.display = 'none';
  information.style.color = 'black';
  buy.style.color = '#ff2e63';
  body.style.background = '#eaeaea';
})

// display snapp box
btnSnapp.addEventListener('click', () => {
  snapp.style.display = 'block';
  slider.style.display = 'none';
  company.style.display = 'none';
  information.style.color = 'black';
  buy.style.color = '#ff2e63';
  body.style.background = '#eaeaea';
})

// open profile page
home.addEventListener('click', () => {
  information.style.color = 'black';
  buy.style.color = 'black';
  home.style.color = '#ff2e63';
  slider.style.display = 'none';
  company.style.display = 'none';
  profile1.style.display = 'block';
  transactionInfo.style.display = 'block';
  body.style.background = '#eaeaea';
  amazon.style.display = 'none';
  apple.style.display = 'none';
  at.style.display = 'none';
  digikala.style.display = 'none';
  facebook.style.display = 'none';
  google.style.display = 'none';
  netflix.style.display = 'none';
  samsung.style.display = 'none';
  snapp.style.display = 'none';
})

// move for buy icon
buy.addEventListener('click', () => {
  buy.style.color = '#ff2e63';
  information.style.color = 'black';
  home.style.color = 'black';
  window.scroll({
    top: 1200,
    left: 0,
    behavior: "smooth"
  })

  profile1.style.display = 'none';
  transactionInfo.style.display = 'none';
  slider.style.display = 'block';
  company.style.display = 'block';
})

// buy amazon
document.querySelector('#amazon-form').addEventListener('submit', (e) => {
  const sender = document.querySelector('#amazon-sender');
  const recipient = document.querySelector('#amazon-recipient');
  const amount = document.querySelector('#amazon-amount');

  let amountDefault = 6;
  let div = document.createElement('p');
  div.classList.add('package');
  div.innerHTML = 'Amazon : 1 unit';

  e.preventDefault();

  if(accountAmount.innerHTML >= amountDefault) {
      buySuccess.style.display = 'block';
      setTimeout(() => {
        buySuccess.style.display = 'none';
      }, 6000)
      accountAmount.innerHTML = accountAmount.innerHTML - parseInt(amount.value);
      buy2.appendChild(div);

      // blockchain
      const blockIndex = bitcoin.createNewTransaction(amount.value, sender.value, recipient.value);
      const lastBlock = bitcoin.getLastBlock();
      const previousBlockHash = lastBlock['hash'];
      const currentBlockData = {
        transactions: bitcoin.newTransactions,
        index: lastBlock['index'] + 1
      };
      const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
      const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
      const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

      // insert data to table
      let table = document.querySelector('#my-table');
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);

      cell1.innerHTML = JSON.stringify(newBlock.index);
      cell2.innerHTML = JSON.stringify(newBlock.timestamp);
      cell3.innerHTML = JSON.stringify(newBlock.transactions);
      cell4.innerHTML = JSON.stringify(newBlock.nonce);
      cell5.innerHTML = JSON.stringify(newBlock.previousBlockHash);
      cell6.innerHTML = JSON.stringify(newBlock.hash);
  }else {
    buyFailed.style.display = 'block';
    setTimeout(() => {
      buyFailed.style.display = 'none';
    }, 6000)
  }

  sender.value = '';
  recipient.value = '';
  amount.value  = '';

  e.preventDefault();
})

// buy apple
document.querySelector('#apple-form').addEventListener('submit', (e) => {
  const sender = document.querySelector('#apple-sender');
  const recipient = document.querySelector('#apple-recipient');
  const amount = document.querySelector('#apple-amount');

  let amountDefault = 7;
  let div = document.createElement('p');
  div.classList.add('package');
  div.innerHTML = 'Apple : 1 unit';

  e.preventDefault();

  if(accountAmount.innerHTML >= amountDefault) {
      buySuccess.style.display = 'block';
      setTimeout(() => {
        buySuccess.style.display = 'none';
      }, 6000)
      accountAmount.innerHTML = accountAmount.innerHTML - parseInt(amount.value);
      buy2.appendChild(div);

      // blockchain
      const blockIndex = bitcoin.createNewTransaction(amount.value, sender.value, recipient.value);
      const lastBlock = bitcoin.getLastBlock();
      const previousBlockHash = lastBlock['hash'];
      const currentBlockData = {
        transactions: bitcoin.newTransactions,
        index: lastBlock['index'] + 1
      };

      const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
      const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
      const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

      // insert data to table
      let table = document.querySelector('#my-table');
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);

      cell1.innerHTML = JSON.stringify(newBlock.index);
      cell2.innerHTML = JSON.stringify(newBlock.timestamp);
      cell3.innerHTML = JSON.stringify(newBlock.transactions);
      cell4.innerHTML = JSON.stringify(newBlock.nonce);
      cell5.innerHTML = JSON.stringify(newBlock.previousBlockHash);
      cell6.innerHTML = JSON.stringify(newBlock.hash);
  }else {
    buyFailed.style.display = 'block';
    setTimeout(() => {
      buyFailed.style.display = 'none';
    }, 6000)
  }

  sender.value = '';
  recipient.value = '';
  amount.value  = '';

  e.preventDefault();
})

// buy at&t
document.querySelector('#at-form').addEventListener('submit', (e) => {
  const sender = document.querySelector('#at-sender');
  const recipient = document.querySelector('#at-recipient');
  const amount = document.querySelector('#at-amount');

  let amountDefault = 6;
  let div = document.createElement('p');
  div.classList.add('package');
  div.innerHTML = 'AT&T : 1 unit';

  e.preventDefault();

  if(accountAmount.innerHTML >= amountDefault) {
      buySuccess.style.display = 'block';
      setTimeout(() => {
        buySuccess.style.display = 'none';
      }, 6000)
      accountAmount.innerHTML = accountAmount.innerHTML - parseInt(amount.value);
      buy2.appendChild(div);

      // blockchain
      const blockIndex = bitcoin.createNewTransaction(amount.value, sender.value, recipient.value);
      const lastBlock = bitcoin.getLastBlock();
      const previousBlockHash = lastBlock['hash'];
      const currentBlockData = {
        transactions: bitcoin.newTransactions,
        index: lastBlock['index'] + 1
      }
      const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
      const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
      const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

      // insert data to table
      let table = document.querySelector('#my-table');
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);

      cell1.innerHTML = JSON.stringify(newBlock.index);
      cell2.innerHTML = JSON.stringify(newBlock.timestamp);
      cell3.innerHTML = JSON.stringify(newBlock.transactions);
      cell4.innerHTML = JSON.stringify(newBlock.nonce);
      cell5.innerHTML = JSON.stringify(newBlock.previousBlockHash);
      cell6.innerHTML = JSON.stringify(newBlock.hash);
  }else {
    buyFailed.style.display = 'block';
    setTimeout(() => {
      buyFailed.style.display = 'none';
    }, 6000)
  }

  sender.value = '';
  recipient.value = '';
  amount.value  = '';

  e.preventDefault();
})

// buy digikala
document.querySelector('#digikala-form').addEventListener('submit', (e) => {
  const sender = document.querySelector('#digikala-sender');
  const recipient = document.querySelector('#digikala-recipient');
  const amount = document.querySelector('#digikala-amount');

  let amountDefault = 4;
  let div = document.createElement('p');
  div.classList.add('package');
  div.innerHTML = 'Digikala : 1 unit';

  e.preventDefault();

  if(accountAmount.innerHTML >= amountDefault) {
      buySuccess.style.display = 'block';
      setTimeout(() => {
        buySuccess.style.display = 'none';
      }, 6000)
      accountAmount.innerHTML = accountAmount.innerHTML - parseInt(amount.value);
      buy2.appendChild(div);

      // blockchain
      const blockIndex = bitcoin.createNewTransaction(amount.value, sender.value, recipient.value);
      const lastBlock = bitcoin.getLastBlock();
      const previousBlockHash = lastBlock['hash'];
      const currentBlockData = {
        transactions: bitcoin.newTransactions,
        index: lastBlock['index'] + 1
      };
      const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
      const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
      const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

      // insert data to table
      let table = document.querySelector('#my-table');
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);

      cell1.innerHTML = JSON.stringify(newBlock.index);
      cell2.innerHTML = JSON.stringify(newBlock.timestamp);
      cell3.innerHTML = JSON.stringify(newBlock.transactions);
      cell4.innerHTML = JSON.stringify(newBlock.nonce);
      cell5.innerHTML = JSON.stringify(newBlock.previousBlockHash);
      cell6.innerHTML = JSON.stringify(newBlock.hash);
  }else {
    buyFailed.style.display = 'block';
    setTimeout(() => {
      buyFailed.style.display = 'none';
    }, 6000)
  }

  sender.value = '';
  recipient.value = '';
  amount.value  = '';

  e.preventDefault();
})

// buy facebook
document.querySelector('#facebook-form').addEventListener('submit', (e) => {
  const sender = document.querySelector('#facebook-sender');
  const recipient = document.querySelector('#facebook-recipient');
  const amount = document.querySelector('#facebook-amount');

  let amountDefault = 5;
  let div = document.createElement('p');
  div.classList.add('package');
  div.innerHTML = 'Facebook : 1 unit';

  e.preventDefault();

  if(accountAmount.innerHTML >= amountDefault) {
      buySuccess.style.display = 'block';
      setTimeout(() => {
        buySuccess.style.display = 'none';
      }, 6000)
      accountAmount.innerHTML = accountAmount.innerHTML - parseInt(amount.value);
      buy2.appendChild(div);

      // blockchain
      const blockIndex = bitcoin.createNewTransaction(amount.value, sender.value, recipient.value);
      const lastBlock = bitcoin.getLastBlock();
      const previousBlockHash = lastBlock['hash'];
      const currentBlockData = {
        transactions: bitcoin.newTransactions,
        index: lastBlock['index'] + 1
      };
      const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
      const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
      const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

      // insert data to table
      let table = document.querySelector('#my-table');
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);

      cell1.innerHTML = JSON.stringify(newBlock.index);
      cell2.innerHTML = JSON.stringify(newBlock.timestamp);
      cell3.innerHTML = JSON.stringify(newBlock.transactions);
      cell4.innerHTML = JSON.stringify(newBlock.nonce);
      cell5.innerHTML = JSON.stringify(newBlock.previousBlockHash);
      cell6.innerHTML = JSON.stringify(newBlock.hash);
  }else {
    buyFailed.style.display = 'block';
    setTimeout(() => {
      buyFailed.style.display = 'none';
    }, 6000)
  }

  sender.value = '';
  recipient.value = '';
  amount.value  = '';

  e.preventDefault();
})

// buy google
document.querySelector('#google-form').addEventListener('submit', (e) => {
  const sender = document.querySelector('#google-sender');
  const recipient = document.querySelector('#google-recipient');
  const amount = document.querySelector('#google-amount');

  let amountDefault = 6;
  let div = document.createElement('p');
  div.classList.add('package');
  div.innerHTML = 'Google : 1 unit';

  e.preventDefault();

  if(accountAmount.innerHTML >= amountDefault) {
      buySuccess.style.display = 'block';
      setTimeout(() => {
        buySuccess.style.display = 'none';
      }, 6000)
      accountAmount.innerHTML = accountAmount.innerHTML - parseInt(amount.value);
      buy2.appendChild(div);

      // blockchain
      const blockIndex = bitcoin.createNewTransaction(amount.value, sender.value, recipient.value);
      const lastBlock = bitcoin.getLastBlock();
      const previousBlockHash = lastBlock['hash'];
      const currentBlockData = {
        transactions: bitcoin.newTransactions,
        index: lastBlock['index'] + 1
      };
      const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
      const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
      const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

      // insert data to table
      let table = document.querySelector('#my-table');
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);

      cell1.innerHTML = JSON.stringify(newBlock.index);
      cell2.innerHTML = JSON.stringify(newBlock.timestamp);
      cell3.innerHTML = JSON.stringify(newBlock.transactions);
      cell4.innerHTML = JSON.stringify(newBlock.nonce);
      cell5.innerHTML = JSON.stringify(newBlock.previousBlockHash);
      cell6.innerHTML = JSON.stringify(newBlock.hash);
  }else {
    buyFailed.style.display = 'block';
    setTimeout(() => {
      buyFailed.style.display = 'none';
    }, 6000)
  }

  sender.value = '';
  recipient.value = '';
  amount.value  = '';

  e.preventDefault();
})

// buy netflix
document.querySelector('#netflix-form').addEventListener('submit', (e) => {
  const sender = document.querySelector('#netflix-sender');
  const recipient = document.querySelector('#netflix-recipient');
  const amount = document.querySelector('#netflix-amount');

  let amountDefault = 4;
  let div = document.createElement('p');
  div.classList.add('package');
  div.innerHTML = 'Netflix : 1 unit';

  e.preventDefault();

  if(accountAmount.innerHTML >= amountDefault) {
      buySuccess.style.display = 'block';
      setTimeout(() => {
        buySuccess.style.display = 'none';
      }, 6000)
      accountAmount.innerHTML = accountAmount.innerHTML - parseInt(amount.value);
      buy2.appendChild(div);

      // blockchain
      const blockIndex = bitcoin.createNewTransaction(amount.value, sender.value, recipient.value);
      const lastBlock = bitcoin.getLastBlock();
      const previousBlockHash = lastBlock['hash'];
      const currentBlockData = {
        transactions: bitcoin.newTransactions,
        index: lastBlock['index'] + 1
      };
      const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
      const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
      const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

      // insert data to table
      let table = document.querySelector('#my-table');
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);

      cell1.innerHTML = JSON.stringify(newBlock.index);
      cell2.innerHTML = JSON.stringify(newBlock.timestamp);
      cell3.innerHTML = JSON.stringify(newBlock.transactions);
      cell4.innerHTML = JSON.stringify(newBlock.nonce);
      cell5.innerHTML = JSON.stringify(newBlock.previousBlockHash);
      cell6.innerHTML = JSON.stringify(newBlock.hash);
  }else {
    buyFailed.style.display = 'block';
    setTimeout(() => {
      buyFailed.style.display = 'none';
    }, 6000)
  }

  sender.value = '';
  recipient.value = '';
  amount.value  = '';

  e.preventDefault();
})

// buy samsung
document.querySelector('#samsung-form').addEventListener('submit', (e) => {
  const sender = document.querySelector('#samsung-sender');
  const recipient = document.querySelector('#samsung-recipient');
  const amount = document.querySelector('#samsung-amount');

  let amountDefault = 5;
  let div = document.createElement('p');
  div.classList.add('package');
  div.innerHTML = 'Samsung : 1 unit';

  e.preventDefault();

  if(accountAmount.innerHTML >= amountDefault) {
      buySuccess.style.display = 'block';
      setTimeout(() => {
        buySuccess.style.display = 'none';
      }, 6000)
      accountAmount.innerHTML = accountAmount.innerHTML - parseInt(amount.value);
      buy2.appendChild(div);

      // blockchain
      const blockIndex = bitcoin.createNewTransaction(amount.value, sender.value, recipient.value);
      const lastBlock = bitcoin.getLastBlock();
      const previousBlockHash = lastBlock['hash'];
      const currentBlockData = {
        transactions: bitcoin.newTransactions,
        index: lastBlock['index'] + 1
      };
      const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
      const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
      const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

      // insert data to table
      let table = document.querySelector('#my-table');
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);

      cell1.innerHTML = JSON.stringify(newBlock.index);
      cell2.innerHTML = JSON.stringify(newBlock.timestamp);
      cell3.innerHTML = JSON.stringify(newBlock.transactions);
      cell4.innerHTML = JSON.stringify(newBlock.nonce);
      cell5.innerHTML = JSON.stringify(newBlock.previousBlockHash);
      cell6.innerHTML = JSON.stringify(newBlock.hash);
  }else {
    buyFailed.style.display = 'block';
    setTimeout(() => {
      buyFailed.style.display = 'none';
    }, 6000)
  }

  sender.value = '';
  recipient.value = '';
  amount.value  = '';

  e.preventDefault();
})

// buy snapp
document.querySelector('#snapp-form').addEventListener('submit', (e) => {
  const sender = document.querySelector('#snapp-sender');
  const recipient = document.querySelector('#snapp-recipient');
  const amount = document.querySelector('#snapp-amount');

  let amountDefault = 3;
  let div = document.createElement('p');
  div.classList.add('package');
  div.innerHTML = 'Snapp : 1 unit';

  e.preventDefault();

  if(accountAmount.innerHTML >= amountDefault) {
      buySuccess.style.display = 'block';
      setTimeout(() => {
        buySuccess.style.display = 'none';
      }, 6000)
      accountAmount.innerHTML = accountAmount.innerHTML - parseInt(amount.value);
      buy2.appendChild(div);

      // blockchain
      const blockIndex = bitcoin.createNewTransaction(amount.value, sender.value, recipient.value);
      const lastBlock = bitcoin.getLastBlock();
      const previousBlockHash = lastBlock['hash'];
      const currentBlockData = {
        transactions: bitcoin.newTransactions,
        index: lastBlock['index'] + 1
      };
      const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
      const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
      const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

      // insert data to table
      let table = document.querySelector('#my-table');
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);

      cell1.innerHTML = JSON.stringify(newBlock.index);
      cell2.innerHTML = JSON.stringify(newBlock.timestamp);
      cell3.innerHTML = JSON.stringify(newBlock.transactions);
      cell4.innerHTML = JSON.stringify(newBlock.nonce);
      cell5.innerHTML = JSON.stringify(newBlock.previousBlockHash);
      cell6.innerHTML = JSON.stringify(newBlock.hash);
  }else {
    buyFailed.style.display = 'block';
    setTimeout(() => {
      buyFailed.style.display = 'none';
    }, 6000)
  }

  sender.value = '';
  recipient.value = '';
  amount.value  = '';

  e.preventDefault();
})

// search bar
document.querySelector('#search-engine-form').addEventListener('submit', (e) => {
  const searchBar = document.querySelector('#search-bar');

  switch(searchBar.value.toLowerCase()) {
    case 'amazon' :
      slider.style.display = 'none';
      company.style.display = 'none';
      apple.style.display = 'none';
      at.style.display = 'none';
      digikala.style.display = 'none';
      facebook.style.display = 'none';
      google.style.display = 'none';
      netflix.style.display = 'none';
      samsung.style.display = 'none';
      snapp.style.display = 'none';
      profile1.style.display = 'none';
      transactionInfo.style.display = 'none';
      amazon.style.display = 'block';
      information.style.color = 'black';
      buy.style.color = '#ff2e63';
      body.style.background = '#eaeaea';
      break;
    case 'apple' :
      slider.style.display = 'none';
      company.style.display = 'none';
      amazon.style.display = 'none';
      at.style.display = 'none';
      digikala.style.display = 'none';
      facebook.style.display = 'none';
      google.style.display = 'none';
      netflix.style.display = 'none';
      samsung.style.display = 'none';
      snapp.style.display = 'none';
      profile1.style.display = 'none';
      transactionInfo.style.display = 'none';
      apple.style.display = 'block';
      information.style.color = 'black';
      buy.style.color = '#ff2e63';
      body.style.background = '#eaeaea';
      break;
    case 'at&t' :
      slider.style.display = 'none';
      company.style.display = 'none';
      apple.style.display = 'none';
      amazon.style.display = 'none';
      digikala.style.display = 'none';
      facebook.style.display = 'none';
      google.style.display = 'none';
      netflix.style.display = 'none';
      samsung.style.display = 'none';
      snapp.style.display = 'none';
      profile1.style.display = 'none';
      transactionInfo.style.display = 'none';
      at.style.display = 'block';
      information.style.color = 'black';
      buy.style.color = '#ff2e63';
      body.style.background = '#eaeaea';
      break;
    case 'digikala' :
      slider.style.display = 'none';
      company.style.display = 'none';
      apple.style.display = 'none';
      at.style.display = 'none';
      amazon.style.display = 'none';
      facebook.style.display = 'none';
      google.style.display = 'none';
      netflix.style.display = 'none';
      samsung.style.display = 'none';
      snapp.style.display = 'none';
      profile1.style.display = 'none';
      transactionInfo.style.display = 'none';
      digikala.style.display = 'block';
      information.style.color = 'black';
      buy.style.color = '#ff2e63';
      body.style.background = '#eaeaea';
      break;
    case 'facebook' :
      slider.style.display = 'none';
      company.style.display = 'none';
      apple.style.display = 'none';
      at.style.display = 'none';
      digikala.style.display = 'none';
      amazon.style.display = 'none';
      google.style.display = 'none';
      netflix.style.display = 'none';
      samsung.style.display = 'none';
      snapp.style.display = 'none';
      profile1.style.display = 'none';
      transactionInfo.style.display = 'none';
      facebook.style.display = 'block';
      information.style.color = 'black';
      buy.style.color = '#ff2e63';
      body.style.background = '#eaeaea';
      break;
    case 'google' :
      slider.style.display = 'none';
      company.style.display = 'none';
      apple.style.display = 'none';
      at.style.display = 'none';
      digikala.style.display = 'none';
      facebook.style.display = 'none';
      amazon.style.display = 'none';
      netflix.style.display = 'none';
      samsung.style.display = 'none';
      snapp.style.display = 'none';
      profile1.style.display = 'none';
      transactionInfo.style.display = 'none';
      google.style.display = 'block';
      information.style.color = 'black';
      buy.style.color = '#ff2e63';
      body.style.background = '#eaeaea';
      break;
    case 'netflix' :
      slider.style.display = 'none';
      company.style.display = 'none';
      apple.style.display = 'none';
      at.style.display = 'none';
      digikala.style.display = 'none';
      facebook.style.display = 'none';
      google.style.display = 'none';
      amazon.style.display = 'none';
      samsung.style.display = 'none';
      snapp.style.display = 'none';
      profile1.style.display = 'none';
      transactionInfo.style.display = 'none';
      netflix.style.display = 'block';
      information.style.color = 'black';
      buy.style.color = '#ff2e63';
      body.style.background = '#eaeaea';
      break;
    case 'samsung' :
      slider.style.display = 'none';
      company.style.display = 'none';
      apple.style.display = 'none';
      at.style.display = 'none';
      digikala.style.display = 'none';
      facebook.style.display = 'none';
      google.style.display = 'none';
      netflix.style.display = 'none';
      amazon.style.display = 'none';
      snapp.style.display = 'none';
      profile1.style.display = 'none';
      transactionInfo.style.display = 'none';
      samsung.style.display = 'block';
      information.style.color = 'black';
      buy.style.color = '#ff2e63';
      body.style.background = '#eaeaea';
      break;
    case 'snapp' :
      slider.style.display = 'none';
      company.style.display = 'none';
      apple.style.display = 'none';
      at.style.display = 'none';
      digikala.style.display = 'none';
      facebook.style.display = 'none';
      google.style.display = 'none';
      netflix.style.display = 'none';
      samsung.style.display = 'none';
      amazon.style.display = 'none';
      profile1.style.display = 'none';
      transactionInfo.style.display = 'none';
      snapp.style.display = 'block';
      information.style.color = 'black';
      buy.style.color = '#ff2e63';
      body.style.background = '#eaeaea';
      break;
    default :
    document.querySelector('#not-found').style.display = 'block';
    setTimeout(() => {
      document.querySelector('#not-found').style.display = 'none';
    }, 5000)
  }

  searchBar.value = '';
  e.preventDefault();
})

// transaction tabs
document.querySelector('#btn1').addEventListener('click', () => {
  document.querySelector('#new').style.display = 'none';
  document.querySelector('#buying').style.display = 'block';
  document.querySelector('#btn1').classList.add('active2');
  document.querySelector('#btn2').classList.remove('active2');
})

document.querySelector('#btn2').addEventListener('click', () => {
  document.querySelector('#buying').style.display = 'none';
  document.querySelector('#new').style.display = 'block';
  document.querySelector('#btn2').classList.add('active2');
  document.querySelector('#btn1').classList.remove('active2');
})

// upload profile image
function loadFile(event) {
  let image = document.querySelector('#profile-1-img-default');
	image.src = URL.createObjectURL(event.target.files[0]);
}
