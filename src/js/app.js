App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {

     App.web3Provider = web3.currentProvider;
     web3 = new Web3(web3.currentProvider);
            console.info('if...');
   } else {
     App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
     web3 = new Web3(App.web3Provider);
       console.info('else...');
   }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('MailApplication.json', function(data) {

    var MailApplicationArtifact = data;

    App.contracts.MailApplication = TruffleContract(MailApplicationArtifact);

    App.contracts.MailApplication.setProvider(App.web3Provider);

    console.info('App.contracts.MailApplication: ' + App.contracts.MailApplication);

    return App.initMailList();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
  //  $(document).on('click', '.btn-adopt', App.sendMail);

  $("#acountConfirmButton").click(function(){
        myAddress = $('#TTAcount').val();
        $('#TXAcount').text(myAddress);

        return App.initMailList(myAddress);
  });

  $("#sendButton").click(function(){

  });

  },

  initMailList: function(accountAddress) {
      var adoptionInstance;
      App.contracts.MailApplication.deployed().then(function(instance) {
      adoptionInstance = instance;
      $('#TXAcount').text('sfafafsafsa');
      return adoptionInstance.getIndices(accountAddress);
  });

  },


  sendMail: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
