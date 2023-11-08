module.exports = (plugin) => {
  const sanitizeOutput = (user) => {
    const {
      password,
      resetPasswordToken,
      confirmationToken,
      ...sanitizedUser
    } = user; // be careful, you need to omit other private attributes yourself
    return sanitizedUser;
  };
  plugin.controllers.user.me = async (ctx) => {
    //console.log('user.me');
    console.log(ctx.state);
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { id: ctx.state.user.id },
      populate: { role: true },
    });

    if (!user) {
      return ctx.unauthorized();
    }

    //ctx.body = await sanitizeUser(user, ctx);
    return {
      data: {
        id: user.id,
        attributes: {
          ...sanitizeOutput(user),
          role: {
            data: {
              id: user.role.id,
              attributes: user.role,
            },
          },
        },
      },
    };
  };

  plugin.controllers.user.findOne = async (ctx) => {
    const id = ctx.params.id;
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      id,
      {
        populate: { role: true },
      }
    );
    const userId = user.id;
    const roleId = user.role.id;
    //console.log('user = ', user);
    return {
      data: {
        id: userId,
        attributes: {
          ...sanitizeOutput(user),
          role: {
            data: {
              id: roleId,
              attributes: user.role,
            },
          },
        },
      },
    };
  };

  return plugin;
};
