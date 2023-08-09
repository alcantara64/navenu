import Config from "../../../app/config"
import { navigate } from "../../../app/navigators"
import axios from "axios"

//
const venueRegex = /https:\/\/navenuapp\.page\.link\/venue\/([^\/?#]+)/
const dropRegex = /https:\/\/navenuapp\.page\.link\/drop\/([^\/?#]+)/
const editorialRegex = /https:\/\/navenuapp\.page\.link\/article\/([^\/?#]+)/
const curatorRegex = /https:\/\/navenuapp\.page\.link\/curator\/([^\/?#]+)/
export class DynamicLinkServices {
  static async buildLink(deepLink: string) {
    let link = ""
    const response = await axios({
      method: "POST",
      url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyBF_C9fA-uDBPHrg6v9DpSizPfCoaMeRoQ`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        dynamicLinkInfo: {
          domainUriPrefix: Config.DEEP_LINK_URL,
          link: deepLink,
          androidInfo: {
            androidPackageName: "com.navenu.app",
          },
          iosInfo: {
            iosBundleId: "com.generate.navenu",
          },
        },
      },
    })
    console.log(response)
    if (response.status === 200) {
      link = response.data.shortLink
    }

    return link
  }

  handleDynamicLink = (link) => {
    // Handle dynamic link inside your own application
    if (link && link.url) {
      if (venueRegex.test(link.url)) {
        const id = link.url.match(venueRegex)[1]
        const venue = { id }
        navigate("VenueDetailScreen", { venue })
      }
      if (dropRegex.test(link.url)) {
        const id = link.url.match(dropRegex)[1]
        const drop = { id }
        navigate("DropScreen", { drop })
      }
      if (editorialRegex.test(link.url)) {
        const id = link.url.match(editorialRegex)[1]
        const article = { id }
        navigate("Article", { article })
      }
      if (curatorRegex.test(link.url)) {
        const id = link.url.match(curatorRegex)[1]
        const curator = { id }
        navigate("CuratorProfileScreen", { curator })
      }
    }
  }
}
