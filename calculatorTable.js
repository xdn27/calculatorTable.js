(function ( $ ) {
 
    $.fn.calculatorTable = function( options ) {

        // === OPTIONS
        // row: element
        // math: array -> object of: formula (elements math), result (result var name), appendTo (append to element)
        // mathRresult: array -> object of: formula (result of result from math opt), result (result var name), appendTo (append to element)
        // debug: boolean
 
        var settings = $.extend({
            row: '',
            math:[],
            mathResult:[],
            debug: true
        }, options );

        if(settings.math.length < 1){
            console.error('Math option is required.');
            return;
        }

        if(settings.row == ''){
            console.error('Row option is required.');
            return;
        }

        var str_subtotal = 'subtotal';
        var str_total = 'total';
        var str_formula = 'formula';
        var str_data = 'data';
        var reg_element = /([A-Za-z.#_]+[A-Za-z0-9.#_])+/g;

        return this.each(function(){

            var $rows = $(this).find(settings.row);
            var mathItems = [];
            var result = {};

            $.each(settings.math, function(imath, vmath){

                var rkey = vmath.result;
                var $mathElementNames = vmath.formula.match(reg_element);

                result[rkey] = [];
                mathItems[rkey] = [];
                mathItems[rkey][str_total] = 0;

                $rows.each(function(irows, vrows){

                    mathItems[rkey][irows] = [];
                    mathItems[rkey][irows][str_formula] = vmath.formula;

                    $.each($mathElementNames, function(inames, vnames){

                        var $nameElement = $(vrows).find(vnames);
                        var nameValue = 0;

                        if($nameElement.data('autoNumeric') !== undefined){
                            nameValue = $nameElement.autoNumeric('get');
                        }else if($nameElement.attr('value') !== undefined){
                            nameValue = $nameElement.val();
                        }else if($nameElement.length > 0){
                            nameValue = $nameElement.text();
                        }

                        if(settings.debug){
                            mathItems[rkey][irows][vnames] = parseFloat(nameValue);
                        }

                        mathItems[rkey][irows][str_formula] = mathItems[rkey][irows][str_formula].replace(vnames, nameValue);

                    });

                    mathItems[rkey][irows][str_subtotal] = math.eval(mathItems[rkey][irows][str_formula]);
                    mathItems[rkey][str_total] += mathItems[rkey][irows][str_subtotal];

                    if(vmath.appendTo !== ''){
                        var $appendElement = $(vrows).find(vmath.appendTo);
                        var appendValue = mathItems[rkey][irows][str_subtotal];

                        if($appendElement.data('autoNumeric') !== undefined){
                            $appendElement.autoNumeric('set', appendValue);
                        }else if($appendElement.attr('value') !== undefined){
                            $appendElement.val(appendValue);
                        }else if($appendElement.length > 0){
                            $appendElement.text(appendValue);
                        }
                    }
                });

                result[rkey][str_data] = mathItems[rkey];
                result[rkey][str_total] = mathItems[rkey][str_total];

                delete result[rkey][str_data][str_total];

            });

            if(settings.mathResult.length > 0){

                var finalResult = [];
                $.each(settings.mathResult, function(iresult, vresult){

                    var mathElementNames = vresult.formula.match(reg_element);

                    finalResult[iresult] = [];
                    finalResult[iresult][str_formula] = vresult.formula;
                    finalResult[iresult][vresult.result] = 0;

                    $.each(mathElementNames, function(inames, vnames){

                        var nameValue = 0;
                        if(result.hasOwnProperty(vnames)){
                            nameValue = parseFloat(result[vnames].total);
                        }

                        finalResult[iresult][str_formula] = finalResult[iresult][str_formula].replace(vnames, nameValue);

                    });

                    result[vresult.result] = math.eval(finalResult[iresult][str_formula]);

                    if(vresult.appendTo !== ''){
                        var $appendElement = $(vresult.appendTo);
                        var appendValue = result[vresult.result];

                        if($appendElement.data('autoNumeric') !== undefined){
                            $appendElement.autoNumeric('set', appendValue);
                        }else if($appendElement.attr('value') !== undefined){
                            $appendElement.val(appendValue);
                        }else if($appendElement.length > 0){
                            $appendElement.text(appendValue);
                        }
                    }

                });

            }

            $(this).data('calculatorTable', result);

        });
    };
}( jQuery ));
