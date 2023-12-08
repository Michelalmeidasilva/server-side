import http from "http";
import fs from "fs";

async function listDirectories(path: string) {
  const directories = await fs.readdir(
    path,
    {
      withFileTypes: true,
      encoding: "utf8",
    },
    (err, files) => {
      console.log(files);
      const routes = {};

      return files
        .filter((item) => item.isDirectory)
        .forEach((item) => {

          routes[item.name] = {

          }

        });
    }
  );

  return directories;
}

// const getNavigation = () => {
//   const files = fs.readdir("./src");
//   console.log(files);
// };

const requestHandler = (filePath?: string) => {
  const navigation = {
    routes: [
      {
        routeName: "Home",
        screen: "Home",
        path: "/",
        file: "home.html",
        status: 200,
      },
      {
        routeName: "Blog",
        screen: "Blog",
        path: "/blog",
        file: "blog.html",
        status: 200,
      },
    ],
    defaultRoute: {
      routeName: "NotFound",
      screen: "NotFound",
      path: "/404.html",
      file: "404.html",
      status: 404,
    },
  };

  const route = navigation.routes.find((route) => route.path === filePath);

  return route ? route : navigation.defaultRoute;
};

const server = http.createServer(async (req, res) => {
  const currentRoute = requestHandler(req?.url);

  const path = "./public/" + currentRoute?.file;

  console.log(await listDirectories("./src"));

  fs.readFile(path, function (_, data) {
    res.writeHead(currentRoute.status, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

server.listen(3000);
