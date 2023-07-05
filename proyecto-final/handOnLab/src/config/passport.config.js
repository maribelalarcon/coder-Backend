import * as UserService from "../services/user.service.js";
import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        console.log("user");
        const { first_name, last_name } = req.body;
        try {
          const exists = await UserService.findByEmail(username);

          if (exists) return done("El usuario ya existe");

          const user = {
            email: username,
            first_name,
            last_name,
            password: createHash(password),
          };

          const result = await UserService.create(user);

          return done(null, result);
        } catch (error) {
          return done(`Error al obtener el usario: ${error}`);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          if (
            username === "adminCoder@coder.com" &&
            password === "adminCod3r123"
          ) {
            done(null, {
              name: "Coder House",
              email: username,
              rol: "admin",
            });
          }

          const user = await UserService.findByEmail(username);

          console.log("user", user);

          if (!user || !isValidPassword(user, password)) {
            console.log(
              "user invalid",
              user,
              password,
              isValidPassword(user, password)
            );
            return done(null, false);
          }

          return done(null, { ...user, rol: "usuario" });
        } catch (error) {
          console.log("error", error);
          return done(`Error al obtener el usario: ${error}`);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.07b861ac085e21ee",
        clientSecret: "f2d49ac4a30be65648b11c36e27e5bd3558c7776",
        callbackURL: "http://localhost:8080/api/sessions/github-callback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const user = await UserService.findByEmail(email);
          console.log("profile", profile);
          if (!user) {
            const newUser = {
              first_name: profile.username,
              last_name: "",
              email,
              password: "",
            };

            const result = await UserService.create(newUser);

            done(null, {
              ...result,
              name: `${result.first_name} ${result.last_name}`,
            });
          } else {
            done(null, {
              ...user,
              name: `${user.first_name} ${user.last_name}`,
            });
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserService.findById(id);
    done(null, user);
  });
};

export default initializePassport;
