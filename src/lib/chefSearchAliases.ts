export const chefSearchAliasGroups = [
  {
    label: 'Bakı üçün aşpaz',
    aliases: ['Bakı aşpaz', 'Bakı aşbaz', 'Baki aspaz', 'Baki asbaz', 'aşpaz Bakı'],
  },
  {
    label: 'Aşpaz xidməti',
    aliases: ['aşpaz', 'aşbaz', 'aspaz', 'asbaz', 'ashpaz', 'ashbaz', 'awpaz', 'awbaz'],
  },
  {
    label: 'Chef və şef',
    aliases: ['chef', 'şef', 'sef', 'wef', 'chef Bakı'],
  },
  {
    label: 'Evdə aşpaz',
    aliases: ['şəxsi aşpaz', 'sexsi aspaz', 'evə aşpaz', 'eve aspaz', 'ev asbazi'],
  },
  {
    label: 'Toy süfrəsi',
    aliases: ['toy aşpazı', 'toy aspazi', 'toy ashpazi', 'toy yeməkləri', 'toy yemekleri', 'toy yemeyleri'],
  },
  {
    label: 'Katerinq',
    aliases: ['katerinq', 'keyterinq', 'katering', 'keytering', 'catering Bakı', 'catering Baku'],
  },
] as const;

export const chefSearchAliases = chefSearchAliasGroups.flatMap((group) => group.aliases);
