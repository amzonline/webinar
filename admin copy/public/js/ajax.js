function post(url, data, success, complete, error) {

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: data,
        success: function (data) {
            if (success) {
                success(data);
            }
        },
        error: function (jqXHR, textStatus) {
            if (error) {
                error(jqXHR, textStatus);
            } else if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
                alert(jqXHR.responseJSON.error);
            }
        },
        complete: function () {
            if (complete) {
                complete();
            }
        }
    });
}

function get(url, success, complete, error) {

    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (success) {
                success(data);
            }
        },
        error: function (jqXHR, textStatus) {
            if (error) {
                error(jqXHR, textStatus);
            } else if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
                alert(jqXHR.responseJSON.error);
            }
        },
        complete: function () {
            if (complete) {
                complete();
            }
        }
    });
}
