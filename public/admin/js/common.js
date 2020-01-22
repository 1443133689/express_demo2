$.extend({
    serializeToJson: function(form) {
        var f = form.serializeArray();
        var result = {};
        f.forEach(function(item) {
            result[item.name] = item.value;
        })
        return result;
    }
})