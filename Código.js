function doGet() {
    const html = HtmlService.createTemplateFromFile('LoginPage');
    const output = html.evaluate()
    output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function checkCredentials(username, password) {
    var ss = SpreadsheetApp.openById('1Q6y8tnP7rcgrxtgrusF5BEJLlhbbu4NrK1EJLEW8u1A');
    var sheet = ss.getSheetByName('Usuarios');
    var data = sheet.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
        if (data[i][0] === username && data[i][1] === password) {
            return true; // Credenciales válidas
        }
    }

    return false; // Credenciales inválidas
}