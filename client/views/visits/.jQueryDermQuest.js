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
