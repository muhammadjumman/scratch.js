
    const para = document.getElementById('para')
    let string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus laudantium quisquam possimus corporis odio illum praesentium voluptas nihil vel dignissimos soluta, unde similique asperiores voluptatem voluptatibus ducimus sed, quia, iusto id iure delectus explicabo quae. Autem, repudiandae rem mollitia commodi quos veritatis esse ipsam asperiores quia, eligendi qui minus atque! Vel ipsum vitae recusandae rem eum necessitatibus asperiores temporibus libero possimus ullam amet dolore ad dolor soluta quibusdam obcaecati sint cupiditate quia fugit nobis, nisi modi, illum nulla deserunt. Veniam nihil voluptate ut ducimus. Doloribus quae inventore velit ab sunt modi consectetur natus illo officia cum iure eveniet itaque aliquid aperiam quaerat, incidunt qui distinctio illum quas? Voluptates ad maxime at eligendi sapiente nesciunt sequi dolorum aspernatur repellat. Assumenda ut hic natus dolorum, iure maxime perspiciatis, sed similique suscipit asperiores molestiae. Exercitationem officia debitis, animi nostrum voluptates labore aspernatur dolore delectus soluta aperiam aut quae laboriosam minima quibusdam dolor. Quae at obcaecati perspiciatis, totam ut tenetur! Libero voluptas neque pariatur consectetur. Deleniti, inventore? Nesciunt eveniet nostrum accusantium esse totam, iste fuga eaque? Rerum nobis inventore a voluptatum nam explicabo ea suscipit recusandae hic dolore, quod optio, incidunt aperiam quae necessitatibus adipisci fuga laudantium minima aliquam. Placeat illo voluptate aperiam suscipit temporibus! Possimus autem excepturi adipisci illum ipsa molestiae rem, eius perspiciatis minus saepe neque omnis, molestias pariatur. Harum assumenda repudiandae accusamus perspiciatis magni facilis ex magnam eligendi. Cumque, molestias unde deserunt autem eligendi qui totam aperiam, amet, explicabo quia laudantium repellendus officia deleniti laboriosam laborum aspernatur veniam fuga. Repellat accusamus obcaecati illum cumque perferendis dolores, maxime neque consequuntur. Libero aperiam eveniet dolores nostrum amet, alias corporis praesentium sit voluptas eaque, perferendis, facere consectetur deleniti omnis rem quasi delectus quis cupiditate harum quo non dolore. Ad beatae, voluptatibus et corporis porro saepe perspiciatis consequuntur. Enim, adipisci nulla consequuntur id voluptates aliquam!'
    let allWord = string.split('\s');
    for (i = 0; i < allWord.length; i++) {
        for (j = 0; j < 6; j++) {
            (function (i) {
                setTimeout(() => {
                    para.innerText += allWord[i] + '\s';
                }, 100 * i);
            })(i);
            i++;
        }
    }
    para.style.textTransform = 'capitalize' //this does not work, the string get written after this code done executing
