// Option

if ($('option:selected').val() == "") {
    $('option:selected').prop('disabled', true);
}

// Dictionary

my_dict = {};

$('#symptoms > div > div > div > div > ul > li > label').each(function(index) {
    key = $(this).text();
    value = $(this).attr('for').substring(6);
    my_dict[key] = value;
});

copy(my_dict)

$('#diagnosis label').each(function(index) {
    key = $(this).text();
    value = $(this).attr('for').substring(6);
    my_dict[key] = value;
});

$('#body-part-selector label').each(function(index) {
    key = $(this).text();
    value = $(this).attr('for').substring(6);
    my_dict[key] = value;
});

$('#pathos > div > div > div > div > ul > li').each(function(index) {
    key = $(this.children[1]).text();
    value = $(this.children[1]).attr('for').substring(6);
    my_dict[key] = value;
    $(this.children[2]).find('li').each(function(index) {
        my_dict[key] += '|' + $(this).attr('data-facet-id');
    });
});

// New Select

$('#lesions > div > div > div > div > ul > li > label').each(function(index) {
  result += '<option value="' + $(this).text() + '">' + $(this).text() + '</option>\n';
});

$('#symptoms > div > div > div > div > ul > li > label').each(function(index) {
  result += '<option value="' + $(this).text() + '">' + $(this).text() + '</option>\n';
});

$('#pathos > div > div > div > div > ul > li > label').each(function(index) {
  result += '<option value="' + $(this).text() + '">' + $(this).text() + '</option>\n';
});

$('#diagnosis label').each(function(index) {
  result += '<option value="' + $(this).text() + '">' + $(this).text() + '</option>\n';
});

// Multiple Select Seperator Change Attempt

'change select': function(event) {
    //console.log($(event.currentTarget));
    var string = $("option:selected", event.currentTarget).map(function () {
        return $(this).text()
    }).get().join(" | ");
    console.log(string);
    //$(event.currentTarget).val($(event.currentTarget).val() + string);
    //console.log($(event.currentTarget).val());
}

// ------ TRANSLATIONS ------

// Dictionaries
var str = "";
$('#lesions > div > div > div > div > ul > li').each(function(index) {
    key = 'translations["' + $(this.children[1]).text() + '"][selectedLanguage]';
    value = $(this.children[1]).attr('for').substring(6);
    $(this.children[2]).find('li').each(function(index) {
        value += '|' + $(this).attr('data-facet-id');
    });
    str += 'LESIONS_DICT[' + key + '] = "' + value + '";\n';
});
$('#symptoms > div > div > div > div > ul > li').each(function(index) {
    key = 'translations["' + $(this.children[1]).text() + '"][selectedLanguage]';
    value = $(this.children[1]).attr('for').substring(6);
    $(this.children[2]).find('li').each(function(index) {
        value += '|' + $(this).attr('data-facet-id');
    });
    str += 'SYMPTOMS_DICT[' + key + '] = "' + value + '";\n';
});
$('#pathos > div > div > div > div > ul > li').each(function(index) {
    key = 'translations["' + $(this.children[1]).text() + '"][selectedLanguage]';
    value = $(this.children[1]).attr('for').substring(6);
    $(this.children[2]).find('li').each(function(index) {
        value += '|' + $(this).attr('data-facet-id');
    });
    str += 'PATHOS_DICT[' + key + '] = "' + value + '";\n';
});
$('#diagnosis label').each(function(index) {
    key = 'translations["' + $(this).text() + '"][selectedLanguage]';
    value = $(this).attr('for').substring(6);
    str += 'DIAGNOSES_DICT[' + key + '] = "' + value + '";\n';
});
$('#diagnosis label').each(function(index) {
    key = 'translations["' + $(this).text() + '"][selectedLanguage]';
    value = $(this).attr('for').substring(6);
    str += 'DIAGNOSES_DICT_SWAP["' + value + '"] = ' + key + ';\n';
});
copy(str);

// Translations
var str = "";
$('#lesions > div > div > div > div > ul > li').each(function(index) {
    key = $(this.children[1]).text();
    str += '"' + key + '": {\n\
        en_US: "' + key + '",\n\
        en_GB: "' + key + '",\n\
        tr_TR: "' + key + '"\n\
    },';
});
$('#symptoms > div > div > div > div > ul > li').each(function(index) {
    key = $(this.children[1]).text();
    str += '"' + key + '": {\n\
        en_US: "' + key + '",\n\
        en_GB: "' + key + '",\n\
        tr_TR: "' + key + '"\n\
    },';
});
$('#pathos > div > div > div > div > ul > li').each(function(index) {
    key = $(this.children[1]).text();
    str += '"' + key + '": {\n\
        en_US: "' + key + '",\n\
        en_GB: "' + key + '",\n\
        tr_TR: "' + key + '"\n\
    },';
});
$('#diagnosis label').each(function(index) {
    key = $(this).text();
    str += '\n\
    "' + key + '": {\n\
        en_US: "' + key + '",\n\
        en_GB: "' + key + '",\n\
        tr_TR: "' + key + '"\n\
    },';
});
copy(str);

// Selects
var str = "";
$('#lesions > div > div > div > div > ul > li > label').each(function(index) {
    str += '<option value="{{tr "' + $(this).text() + '"}}">{{tr "' + $(this).text() + '"}}</option>\n';
});
$('#symptoms > div > div > div > div > ul > li > label').each(function(index) {
    str += '<option value="{{tr "' + $(this).text() + '"}}">{{tr "' + $(this).text() + '"}}</option>\n';
});
$('#pathos > div > div > div > div > ul > li > label').each(function(index) {
    str += '<option value="{{tr "' + $(this).text() + '"}}">{{tr "' + $(this).text() + '"}}</option>\n';
});
$('#diagnosis label').each(function(index) {
    str += '<option value="{{tr "' + $(this).text() + '"}}">{{tr "' + $(this).text() + '"}}</option>\n';
});
copy(str);

// ATOM REGEX REPLACE EXAMPLE
// title="(.*?) > (.*?)"
// title="{{tr "$1"}} > {{tr "$2"}}"
