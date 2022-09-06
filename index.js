

function changemode(){
    let mybody = document.body;
    mybody.classList.toggle('mydark');
}
function closecoupon(){
    let coupon= document.getElementById(`coupon`);
    coupon.style.display="none";
    document.getElementById("photoslider").style.opacity="1";

}