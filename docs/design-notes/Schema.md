Post
  // Denormalize? Want collections of comments so that we can easily look
  // at a students's comment history. Also want collections of images and their
  // votes so that we can look at when students seems to like.
  _id
  author
  created                 // Create time of original, immutable.
  prompt                  // Points to head of Post tree for Comments.
  votes {total, voting_history[] of vote}
  flags {summary, flagging_history}
  published boolean
  deleted {boolean, by_whom}
  level                   // 0 = prompt, 1 = post, 2 = comment, 3 = comment on comment...
  revisions[]             // Array, 0 is the latest
    revisor                 // Usually the author, but could be teacher or admin.
    revised                 // Create time of this revision, immutable.
    tags[] of tag
    title                   // Absent (or optional) for comments
    body
    images[] of image       // Can have more than one associated image.
    comments[] of post      // Comments are posts on posts, can have sub-comments

Vote
  up-or-down              // Either 1 or -1.
  by_whom                 // Id of person who cast vote.
  when                    // Timestamp

Image
  // Denormalized with revisions.
  _id
  deleted {boolean, by_whom}
  revisions[]
    maker {_id?, name}   // Who made the photograph? name should be in the same format as it is on a user.
    caption
    src     // URL where the original was found if not made by student
    link (pointer to image on filestore)

Tag
  _id
  created
  revisions[]
    color
    short_name
    long_name
    description
