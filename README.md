# calculatorTable.js
Plugin untuk menghitung nilai (per baris) dengan operasi dasar matematika pada element HTML. Membutuhkan plugin jquery (jquery.com) dan mathjs (mathjs.org) agar bisa berjalan.

## Pengaturan dan Penggunaan
Ada beberapa pengaturan yang harus diset untuk menggunakan plugin ini.
* row : adalah class atau ID dari sebuah element row, misal tr dari table.
* math: isi dari option ini adalah array dari formula matematika dasar, nilai akan diambil dari element yang sudah ditentukan pada formula dan result adalah sum dari semua row yang telah dihitung. Gunakan option appendTo untuk menampilkan nilai hasil dari perhitungan (per row) pada salah satu element di row tersebut.  
* mathResult: option ini untuk menghitung kembali hasil sum/result dari row yang sudah hitung sebelumnya pada option math. Secara penggunaan sama dengan math, hanya isi dari formula adalah variable result dari formula math sebelumnya dan appendTo nya akan ditembak langsung, tidak dicari dari row atau inisial element.

Jangan gunakan strip " - " pada nama element, karena akan terbaca sebagai operator matematika. Gunakan underscore atau gaya camelCase. Bedakan nama result pada tiap option math dan mathResult.

### Contoh Penggunaan
```
// HTML
<table id="itemTable" border="1">
    <tr>
        <td>Price</td>
        <td>Discount</td>
        <td>Qty</td>
        <td>SubTotal</td>
    </tr>
    <tr class="rowClassName">
        <td class="classPrice">500</td>
        <td class="classDiscount">100</td>
        <td><input type="text" class="classQty" value="2"></td>
        <td class="subTotal"></td>
    </tr>
    <tr class="rowClassName">
        <td class="classPrice">200</td>
        <td class="classDiscount">0</td>
        <td><input type="text" class="classQty" value="5"></td>
        <td class="subTotal"></td>
    </tr>
</table>

<p>Total Price: <span class="totalPrice"></span></p>
<p>Total Discount: <span class="totalDiscount"></span></p>
<p>Total: <span class="total"></span></p>

// SCRIPT JS
<script type="text/javascript">
var options = {
    row: '.rowClassName',
    math: [
        {formula: '(.classPrice-.classDiscount)*.classQty', result: 'sumSubTotal', appendTo: '.subTotal'},
        {formula: '.classDiscount*.classQty', result: 'sumDiscount'},
    ],
    mathResult:[
        {formula: 'sumSubTotal', result: 'total', appendTo: '.total'},
        {formula: 'sumDiscount', result: 'totalDiscount', appendTo: '.totalDiscount'},
        {formula: 'sumSubTotal-sumDiscount', result: 'totalPrice', appendTo: '.totalPrice'}
    ]
}

$(document).ready(function(){
    var itemTable = $('#itemTable').calculatorTable(config);
    
    // Access result object 
    console.log(itemTable.data('calculatorTable'));
    
    $(document).on('keyup', '.classQty', function(){
        // init kembali untuk menghitung ulang
        itemTable = $('#itemTable').calculatorTable(config);
    });
});
</script>
```
[Demo](https://jsfiddle.net/nqx8hpc9/)

Semoga bermanfaat.
Jangan lupa traktir saya kopi dan rokok.
