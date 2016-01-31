Post
  // Denormalize? Want collections of comments so that we can easily look
  // at a students's comment history. Also want collections of images and their
  // votes so that we can look at when students seems to like.
  _id
  author
  revisor                 // Usually the author, but could be teacher or admin.
  created                 // Create time of original, immutable.
  revised                 // Create time of this revision, immutable.
  prompt                  // Points to head of Post tree for Comments.
  title                   // Absent (or optional) for comments
  body
  images[] of image       // Can have more than one associated image.
  comments[] of post      // Comments are posts on posts, can have sub-comments
  tags[] of tag
  votes {total, voting_history[] of vote}
  flags {summary, flagging_history}
  published boolean
  deleted {boolean, by_whom}
  revision_tree           // Id of previous revision (turtles all the way down).

Vote
  up-or-down              // Either 1 or -1.
  by_whom                 // Id of person who cast vote.
  when                    // Timestamp

Comment
  _id
  author
  created
  post                    // Id of post this comment refers to.
  title
  body
  votes
  flags
  published
  deleted
  revisions[] of comment

Image
  // Denormalized with revisions.
  _id
  link (pointer to image on filestore)
  src     // URL where the original was found if not made by student
  caption
  maker {self boolean, name}   // Who made the photograph?
  deleted {boolean, by_whom}
  revisions[] of image  // Only changed fields, null in all but head.

Tag
  _id
  short_name
  long_name
  description
  color
  revisions[] of tag, only the head tag has a non-null revisions entry
  created
