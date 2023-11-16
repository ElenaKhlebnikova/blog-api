/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  await knex('posts').del();
  await knex('posts').insert([
    {
      username: 'user123',
      title: 'Amazing Article',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget tortor vitae tortor placerat dapibus vel ut libero.',
    },
    {
      username: 'awesomeUser',
      title: 'Interesting Read',
      text: 'Fusce vitae urna consequat, convallis ex nec, convallis mauris. Nulla tincidunt eros vitae neque fermentum, eu dapibus ligula commodo.',
    },
    {
      username: 'blogMaster',
      title: 'Fantastic Blog Post',
      text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus ullamcorper quam at tempor pharetra.',
    },
    {
      username: 'proBlogger',
      title: 'Insightful Writing',
      text: 'Integer eget facilisis lorem. Ut nec metus tincidunt, vestibulum mi vel, scelerisque risus. Duis pretium, lectus sed dictum pharetra, odio augue vulputate dui.',
    },
    {
      username: 'contentCreator',
      title: 'Compelling Content',
      text: 'Quisque et consectetur augue. Suspendisse potenti. Mauris ac purus et libero tincidunt feugiat. Sed aliquam, odio quis congue euismod, justo est vulputate libero.',
    },
    {
      username: 'writingExpert',
      title: 'Masterpiece Unveiled',
      text: 'Aliquam erat volutpat. Phasellus accumsan massa eu ligula sollicitudin tristique. Vestibulum venenatis risus vel ipsum venenatis, nec tincidunt velit volutpat.',
    },
    {
      username: 'creativeMind',
      title: 'Imagination Explored',
      text: 'Vestibulum et nulla ac nulla fringilla dignissim. Etiam malesuada purus nec elit molestie fermentum. Phasellus varius dui ac justo efficitur, quis sollicitudin metus efficitur.',
    },
    {
      username: 'thoughtfulWriter',
      title: 'Reflections Shared',
      text: 'Curabitur tincidunt purus id magna gravida convallis. Nullam feugiat libero vel libero pharetra, vitae tincidunt elit consequat. Donec maximus lacus id quam fermentum convallis.',
    },
    {
      username: 'bloggingEnthusiast',
      title: 'Passion Expressed',
      text: 'Sed at turpis ullamcorper, bibendum velit eu, accumsan metus. Aenean commodo elit nec lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',
    },
    {
      username: 'wordsmithExtraordinaire',
      title: 'Eloquent Wordsmithing',
      text: 'In hac habitasse platea dictumst. Suspendisse potenti. Nullam sed est consequat, suscipit tortor sed, malesuada lorem. Maecenas eget elit non augue pharetra congue.',
    },
  ]);
};
