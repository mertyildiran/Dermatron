Template.index.onRendered(function () {

    scheduler.config.multi_day = true;
	var pizza_size = [
		{ key: 1, label: 'Small' },
		{ key: 2, label: 'Medium' },
		{ key: 3, label: 'Large' }
	];

	scheduler.locale.labels.section_text = 'Text';
	scheduler.locale.labels.section_checkbox = 'Checkbox';
	scheduler.locale.labels.section_radiobutton = 'Radiobutton';
	scheduler.locale.labels.section_select = 'Select';
	scheduler.locale.labels.section_template = 'Template';

	scheduler.config.lightbox.sections = [
		{ name: "text", height: 50, map_to: "text", type: "textarea", focus: true },
		{ name: "checkbox", map_to: "single_checkbox", type: "checkbox", checked_value: "registrable", unchecked_value: "unchecked" },
		{ name: "radiobutton", height: 58, options: pizza_size, map_to: "radiobutton_option", type: "radio", vertical: true },
		{ name: "select", height: 21, map_to: "type", type: "select", options: pizza_size },
		{ name: "template", height: 21, map_to: "text", type: "template" },
		{ name: "time", height: 72, type: "calendar_time", map_to: "auto" },
		{ name: "time", height: 72, type: "time", map_to: "auto"}
	];

	scheduler.config.full_day = true;
    //scheduler.config.first_hour = 7;
    //scheduler.config.last_hour = 19;

    scheduler.xy.scale_height=30;

    scheduler.config.dblclick_create = false

    scheduler.config.xml_date="%Y-%m-%d %H:%i";
    scheduler.init("scheduler_here", new Date());
    scheduler.load("./visits.xml");

});
